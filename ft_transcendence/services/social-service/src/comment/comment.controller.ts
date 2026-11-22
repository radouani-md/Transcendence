import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import type { AuthRequest } from "../guards/auth.guard.js";
import { CommentDto } from "./dtos/comment.dto.js";

    @Controller('api/post')
export class CommentController {
    constructor (private readonly commentService: CommentService) {}

    @Post(':id/comment')
    @UseGuards(JwtAuthGuard)
    public addComment(@Body() body: CommentDto, @Req() request: AuthRequest, @Param('id', ParseIntPipe) postId: number) {
        const payload  = request.user;
        console.log("__--_>", body);

        return ( this.commentService.addComment(body, payload.sub, postId) );
    }

    @Get(':id/comment')
    public  getComments(
        @Param('id', ParseIntPipe) postId: number,
        @Query('cursor', new ParseIntPipe({ optional: true })) cursor: number  | undefined
    ){
        return (this.commentService.getComments(cursor, postId))
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':postId/comment/:commentId')
    public deleteComment(
        @Param('commentId', ParseIntPipe) commentId: number,
        @Req() req: AuthRequest
    ) {
        const payload = req.user;

        return this.commentService.deleteComment(commentId, payload.sub);
    }

}

// THIS THE CHANGE