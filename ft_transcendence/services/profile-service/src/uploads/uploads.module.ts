import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsControllers } from './uploads.controller.js';

@Module({
    controllers: [UploadsControllers],
    imports: [MulterModule.register()],
})
export class UploadsModule {

}