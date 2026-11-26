import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service.js";
import { ProductDto } from "./dtos/product.dto.js";
import {JwtAuthGuard} from "../guards/auth.guard.js";
import type {AuthRequest} from "../guards/auth.guard.js";
import { UseGuards } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';

@Controller('api')
export class ProductController {
    constructor (private readonly productService: ProductService){}

    @Post('product')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './marketplace-upload',
            filename: (req, file, cb) => {
                const prefix = `${Date.now()}-${Math.random()*100000}`
                const filename = `${prefix}-${file.originalname}`;
                cb (null, filename);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')){
                cb(null, true); // handel image
            }else {
                cb(new BadRequestException('Unsupported file format'), false);
            }
        },
        limits: { fileSize: 50 * 1024 * 1024 }
    }))
    @UseGuards(JwtAuthGuard)
    public postProduct(@Body() body: ProductDto, @Req() request: AuthRequest, @UploadedFile() file: Express.Multer.File)
    {
        const payload = request.user;
        if (!file) throw new BadRequestException('no file provided');

        return (this.productService.postProduct(body, payload.sub, file));
    }

    @Get('product')
    @UseGuards(JwtAuthGuard)
    public getAllProducts(
        @Query('cursor', new ParseIntPipe({ optional: true })) cursor: number  | undefined,
        @Req() request: AuthRequest
    ){
        const payload = request.user;
        console.log(payload);
        return (this.productService.getAllProduct(cursor, payload.sub));
    }

    @Delete('product:id')
    @UseGuards(JwtAuthGuard)
    public deletePost(@Param('id', ParseIntPipe) productId: number, @Req() request: AuthRequest){
        const payload = request.user;
        
        return (this.productService.deleteProduct(productId, payload.sub))
    }


}