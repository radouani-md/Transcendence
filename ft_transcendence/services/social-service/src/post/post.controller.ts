import { BadRequestException, Body, Controller, Delete, ForbiddenException, Param, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import type { AuthRequest } from "../guards/auth.guard.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import { PostDto } from "./dtos/post.dto.js";
import { PostService } from "./post.service.js";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";


@Controller('api/club')
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Post('post')
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
        }
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

    @Delete('post/:id')
    @UseGuards(JwtAuthGuard)
    public deletePost(@Param('id', ParseIntPipe) postId: number, @Req() request: AuthRequest){
        const payload = request.user;
        if (payload.role !== 'CLUB') throw new ForbiddenException('Only club can create Post');
        
        return (this.postService.deletePost(postId, payload.sub))
    }




}