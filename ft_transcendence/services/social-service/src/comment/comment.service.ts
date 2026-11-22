import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CommentDto } from "./dtos/comment.dto.js";

@Injectable()
export class CommentService {

    constructor(private readonly prisma: PrismaService) {}

    public async addComment(commentDto: CommentDto, userId: number, postId: number) {
        
        const { content } = commentDto;

        const post = await this.prisma.post.findUnique({
            where: { id: postId }
        })

        if (!post)
            throw new NotFoundException('post Not Found');

        const newComment = await this.prisma.comment.create({
            data: {
                userId,
                postId,
                content
            }
        })
        console.log(newComment);

        return ({ newComment });
    }

    public async getComments(cursor: number | undefined, postId: number) {

        const post = await this.prisma.post.findUnique({
            where: { id: postId}
        })
        if (!post)
            throw new NotFoundException('post Not Found');
        const comments = await this.prisma.comment.findMany({
            where: {
                postId
            },
            orderBy: { id: 'desc' },
        })

        return ({ comments });
    }

    public async deleteComment(commentId: number, userId: number) {

        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment)
            throw new NotFoundException('Comment not found');

        if (comment.userId !== userId)
            throw new ForbiddenException(
                'You are not allowed to delete this comment'
            );

        await this.prisma.comment.delete({
            where: { id: commentId }
        });

        return { message: 'Comment deleted successfully' };
    }

}