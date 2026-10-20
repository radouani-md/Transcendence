import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from "express"; 
import { diskStorage } from "multer"


@Controller("api/uploads")
export  class UploadsController {

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, cb) => {
                const prefix = `${Date.now()}-${Math.random()*100000}`
                const filename = `${prefix}-${file.originalname}`;
                cb (null, filename);
            }
        }),
    }))
    public  uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('no file provided');

        console.log("File uploaded: ", { file });

        return ({message: "File upleaded successefully"})
    }

}