import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { ClubModule } from './club/club.module.js';
import { UploadsModule } from './uploads/uploads.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClubModule,
    UploadsModule,
    PrismaModule
  ]
})
export class AppModule {}
