import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller.js";
import { Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CommentService } from "./comment.service.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { JwtModule } from "@nestjs/jwt";


@Module({
    controllers: [ CommentController ],
    providers: [ PrismaService, CommentService, JwtAuthGuard ],
    imports: [
        PrismaModule,
        JwtModule.register({})
    ]
})
export class CommentModule {}