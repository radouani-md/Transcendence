import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { ReactionController } from "./reaction.controller.js";
import { ReactionService } from "./reaction.service.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [ ReactionController ],
    providers: [ PrismaService, ReactionService, JwtAuthGuard ],
    imports: [
        PrismaModule,
        JwtModule.register({})
    ]
})
export class ReactionModule {}