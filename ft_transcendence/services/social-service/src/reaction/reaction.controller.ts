import { Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ReactionService } from "./reaction.service.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import type { AuthRequest } from "../guards/auth.guard.js"

@Controller('api/post')
export class ReactionController {
    constructor(private readonly reactionService: ReactionService){}

    @Post(':id/like')
    @UseGuards(JwtAuthGuard)
    public likePost(@Req() request: AuthRequest, @Param('id', ParseIntPipe) postId: number)
    {
        const payload = request.user;

        return (this.reactionService.likePost(payload.sub, postId))
    }

    @Delete(':id/like')
    @UseGuards(JwtAuthGuard)
    public unlikePost(@Req() request: AuthRequest, @Param('id', ParseIntPipe) postId: number)
    {
        const payload = request.user;

        return (this.reactionService.unlikePost(payload.sub, postId))
    }
}