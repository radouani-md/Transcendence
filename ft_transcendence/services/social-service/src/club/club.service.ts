import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { ClubDto } from "./dtos/club.dto.js";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler.js";


@Injectable()
export class ClubService {
    constructor (private readonly prisma: PrismaService) {}

    public async clubInfos(clubDto: ClubDto, userId: number) {
        const {title, description, logoUrl, coverUrl} = clubDto;
        const nameTitle = title.trim().toLowerCase();

        const club = await this.prisma.club.findUnique({
            where: { userId }
        })
        const clubName = await this.prisma.club.findUnique({
            where : {title: nameTitle}
        })
        if (clubName)
            throw new ConflictException('Club name already exist');
        if (club)
            throw new ConflictException('Club already exists');
        
        const newClub = await this.prisma.club.create({
            data: {
                userId: userId,
                title: nameTitle,
                description,
                logoUrl,
                coverUrl
            },
            select: {
                id: true,
                userId: true,
                title: true,
                description: true,
                logoUrl: true,
                coverUrl: true
            }
        })
        return ({ newClub })
    }
}