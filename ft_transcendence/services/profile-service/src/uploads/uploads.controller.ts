import {
    Controller,
    Post,
    Get,
    Res,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    Param
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import type { Express, Response } from 'express';

@Controller("api/uploads")
export class UploadsControllers {

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, cb) => {
                const prefix = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
                const filename = `${prefix}-${file.originalname}`;
                cb(null, filename);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image')){
                cb(null, true);
            } else {
                cb(new BadRequestException('Unsupported file format'), false);
            }
        },
        limits: { fileSize: 1024 * 1024 * 10} // 10 migabyte
    }))
    public uploadFile(@UploadedFile() file: Express.Multer.File) {
        if(!file) throw new BadRequestException('No file uploaded');

        console.log("File uploaded", {file});
        return { message: "File uploaded successfully"};
    }

    @Get(":image")
    public showUploadedImage(@Param("image") image: string, @Res() res: Response){
        return res.sendFile(image, { root: './images' });
    }
}