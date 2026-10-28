import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import type { AuthRequest } from "../guards/auth.guard.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import { PostDto, UpdatePostDto } from "./dtos/post.dto.js";
import { PostService } from "./post.service.js";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "node:path";
import { unlinkSync } from "node:fs";


@Controller()
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Post('api/club/post')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, cb) => {
                const prefix = `${Date.now()}-${Math.random()*100000}`
                const filename = `${prefix}-${file.originalname}`;
                cb (null, filename);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')){
                cb(null, true); // handel image
            }else {
                cb(new BadRequestException('Unsupported file format'), false);
            }
        },
        limits: { fileSize: 50 * 1024 * 1024 }
    }))
    @UseGuards(JwtAuthGuard)
    public sharePost(
        @Body() body: PostDto,
        @Req() request: AuthRequest,
        @UploadedFile() file: Express.Multer.File
    ){
        const payload = request.user;
        if (payload.role !== 'CLUB') throw new ForbiddenException('Only club can create Post');

        if (!file) throw new BadRequestException('no file provided');

        return (this.postService.sharePost(body, payload.sub, file));
    }

    @Patch('api/club/post/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, cb) => {
                const prefix = `${Date.now()}-${Math.random()*100000}`
                const filename = `${prefix}-${file.originalname}`;
                cb (null, filename);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')){
                cb(null, true); // handel image
            }else {
                cb(new BadRequestException('Unsupported file format'), false);
            }
        },
        limits: { fileSize: 50 * 1024 * 1024 }
    }))
    @UseGuards(JwtAuthGuard)
    public async updatePost(
        @Body() body: UpdatePostDto,
        @Param('id', ParseIntPipe) postId: number,
        @Req() request: AuthRequest,
        @UploadedFile() file: Express.Multer.File
    ){
        const payload = request.user;
        try{
            if (payload.role !== 'CLUB') throw new ForbiddenException('Only club can update Post');
    
            return ( await this.postService.updatePost(body, postId, payload.sub, file ) );
        }catch (error)
        {
            if (file.path)
            {
                try {                    
                    const imagePath = join(process.cwd(), `./${file.path}`)
                    unlinkSync(imagePath); 
                }catch {
                    throw new BadRequestException('<Custom>: The file is already removed from server')
                }

            }
            throw error;
        }
    }

    @Delete('api/club/post/:id')
    @UseGuards(JwtAuthGuard)
    public deletePost(@Param('id', ParseIntPipe) postId: number, @Req() request: AuthRequest){
        const payload = request.user;
        if (payload.role !== 'CLUB') throw new ForbiddenException('Only club can create Post');
        
        return (this.postService.deletePost(postId, payload.sub))
    }

    @Get('api/post/:id')
    public getPost(@Param('id', ParseIntPipe) postId: number){

        return (this.postService.getPost(postId));
    }

    @Get('api/post')
    public getAllPosts(@Query('cursor') cursor?: number){
        return (this.postService.getAllPosts(cursor));
    }



}