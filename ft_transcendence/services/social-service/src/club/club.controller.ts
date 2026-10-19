import { Body, Controller, ForbiddenException, Post, Req, UseGuards } from "@nestjs/common";
import { ClubService } from "./club.service.js";
import { ClubDto } from "./dtos/club.dto.js";
import type { AuthRequest } from "../guards/auth.guard.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";


@Controller('api/club')
export class ClubController {
    constructor (private readonly clubService: ClubService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    public clubInfos(@Body() body: ClubDto, @Req() request: AuthRequest){
        const payload = request.user;
        if (payload.role !== 'CLUB')
            throw new ForbiddenException('Only club can create profile')
        return (this.clubService.clubInfos(body, payload.sub))
    }



}