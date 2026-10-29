import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PostDto, UpdatePostDto } from "./dtos/post.dto.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { ClubDto } from "../club/dtos/club.dto.js";
import { MediaType } from "../generated/prisma/enums.js";
import { create } from "domain";
import { unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { unlinkSync } from "node:fs";
import { take } from "rxjs";

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
                media: {
                    create: {
                        url:  file.path,
                        type: typeM,
                        },
                    }
            },
            include: {
                media: true
            }
        })
        
        return ({ newPost });
    }

    public async updatePost(updatePostDto: UpdatePostDto, postId: number, userId: number, file: Express.Multer.File)
    {
        const {content} = updatePostDto;

        const club = await this.prisma.club.findUnique({
            where: { userId }
        })

        if (!club)
            throw new NotFoundException("Club profile not found");
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                media: true
            }
        })

        if (!post)
            throw new NotFoundException("The post deosn't exist");

        if (post?.clubId !== club.id)
            throw new ForbiddenException('you cannot delete post of someone else');

        if (content === undefined && !file)
            throw new BadRequestException('Try to Provide text or media (file)');

        const oldMedia = post.media[0].url;

        const updatedPost = await this.prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                ...(content !== undefined && {content}),
                ...(file && {
                    media: post.media[0]
                    ? {
                        update: {
                            where: {
                                id: post.media[0].id
                            },
                            data: {
                                url: file.path,
                                type: file.mimetype.startsWith('video/') ? 'VIDEO':'IMAGE'
                            }
                        }
                    }
                    :{
                        create: {
                        url:  file.path,
                        type: file.mimetype.startsWith('video/') ? 'VIDEO':'IMAGE',
                        },
                    } 
                })
            },
            include: {
                media: true
            }
            
        })
        if (file && oldMedia)
        {
            try{
                const imagePath = join(process.cwd(), `./${oldMedia}`)
                unlinkSync(imagePath);
            }catch {
                throw new BadRequestException('<Custom>: The file is already removed from server')
            }
        }
        
        return ({ updatedPost });
    }

    public async deletePost(postId: number, userId: number)
    {
        const club = await this.prisma.club.findUnique({
            where: { userId }
        })

        if (!club)
            throw new NotFoundException("The club deosn't exist");
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                media: true
            }
        })

        if (!post)
            throw new NotFoundException("The post deosn't exist");
        console.log(`-- ${post?.clubId} !== ${club.id}`)
        if (post?.clubId !== club.id)
            throw new ForbiddenException('You cannot delete post of someone else');

        const deletePost = await this.prisma.post.delete({
            where: {
                id: postId
            }
        })
        // console.log(`${post.media.length}`)
        try{
            const imagePath = join(process.cwd(), `./${post.media[0].url}`)
            unlinkSync(imagePath);

        }catch {
            return ({ message: "The Post have already removed from the server" })
        }

        return ({ message: "The Post deleted successfully" })
    }

    public async getPost(postId: number){
        
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                media: true,
                _count: {
                    select: { reactions: true }
                }
            }
        }) 

        if (!post)
            throw new NotFoundException('post Not found');

        return ( {post} );
    }
    
    public async getAllPosts(cursor?: number) {
        
        const limit = 3;

        const posts = await this.prisma.post.findMany({

            where: {
                ...(cursor !== undefined && {
                    id: { lt: cursor }
                })
            },
            take: limit + 1,
            
            orderBy: { id: 'desc' },
            include: {
                media: true,
                _count: {
                    select: { reactions: true }
                }
            }
        })

        if (!posts.at(0))
            throw new NotFoundException('posts Not found');

        const hasMorePosts: boolean = posts.length > limit;
        
        if (hasMorePosts)
            posts.pop();

        const nextCursor = hasMorePosts ?
                            posts[limit - 1].id
                            : null

        return ( { posts, hasMorePosts, nextCursor } );
    }


}