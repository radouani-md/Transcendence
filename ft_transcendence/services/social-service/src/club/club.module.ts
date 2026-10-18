import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { ClubController } from "./club.controller.js";
import { ClubService } from "./club.service.js";
import { JwtModule } from "@nestjs/jwt";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./guards/auth.guard.js";


@Module({
    controllers: [ClubController],
    providers: [ClubService, PrismaService, JwtAuthGuard],
    imports: [
        PrismaModule,
        JwtModule.register({})
    ]
})

export class ClubModule {}