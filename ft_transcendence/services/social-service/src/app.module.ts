import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { ClubModule } from './club/club.module.js';
import { UploadsModule } from './uploads/uploads.module.js';
import { PostModule } from './post/post.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClubModule,
    PrismaModule,
    PostModule
  ]
})
export class AppModule {}
