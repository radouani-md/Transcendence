import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";


@Injectable()
export class ReactionService {
    constructor(private readonly prisma: PrismaService) { }

    public async likePost(userId: number, postId: number) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId }
        })

        if (!post)
            throw new NotFoundException('Post Not Found');

        const isExistingLike = await this.prisma.reaction.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        })

        if (isExistingLike)
            throw new ConflictException('post has already like counted ');

        const like = await this.prisma.reaction.create({
            data: {
                userId,
                postId
            }
        })


        return ({ like });
    }

    public async unlikePost(userId: number, postId: number) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId }
        })

        if (!post)
            throw new NotFoundException('Post Not Found');

        const isExistingLike = await this.prisma.reaction.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        })

        if (!isExistingLike)
            throw new NotFoundException('post has no like ');

        const like = await this.prisma.reaction.delete({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        })


        return ({ message: 'the reaction has been deleted successfully' });
    }

}