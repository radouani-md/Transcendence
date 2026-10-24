import { Module } from "@nestjs/common";
import { PostController } from "./post.controller.js";
import { PostService } from "./post.service.js";
import { Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [ PostController ],
    providers: [ PostService, PrismaService, JwtAuthGuard ],
    imports: [
        PrismaModule,
        JwtModule.register({})
    ]
})
export class PostModule {}