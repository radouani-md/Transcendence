import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PostDto } from "./dtos/post.dto.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { ClubDto } from "../club/dtos/club.dto.js";
import { MediaType } from "../generated/prisma/enums.js";
import { create } from "domain";

@Injectable()
export class PostService {

    constructor(private readonly prisma: PrismaService){}

    public async sharePost(postDto: PostDto, userId: number, file: Express.Multer.File)
    {
        const {content} = postDto;

        const club = await this.prisma.club.findUnique({
            where: { userId }
        })

        if (!club)
            throw new NotFoundException("Club profile not found");

        let typeM: MediaType = file.mimetype.startsWith('video/')
        ? 'VIDEO'
        : 'IMAGE';

        const newPost = await this.prisma.post.create({
            data: {
                clubId: club.id,
                content,
                images: {
                    create: {
                        url:  file.path,
                        type: typeM,
                        },
                    }
            },
            include: {
                images: true
            }
        })
        
        return ({ newPost });
    }

    public async deletePost(postId: number, userId: number)
    {
        const user = await this.prisma.club.findUnique({
            where: { userId }
        })

        if (!user)
            throw new NotFoundException("The club deosn't exist");
        const post = await this.prisma.post.findUnique({
            where: { id: postId }
        })

        if (post?.clubId !== postId)
            throw new ForbiddenException('you cannot delete post of someone else');
        
        const deletePost = await this.prisma.post.delete({
            where: {
                id: postId
            }
        })
        return ({ deletePost })
    }



}