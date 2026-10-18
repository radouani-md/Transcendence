import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { ClubDto } from "./dtos/club.dto.js";


@Injectable()
export class ClubService {
    constructor (private readonly prisma: PrismaService) {}

    public async clubInfos(clubDto: ClubDto, userId: number) {
        const {title, description, logoUrl, coverUrl} = clubDto;

        const club = await this.prisma.club.findUnique({
            where: { userId }
        })
        
        if (club)
            throw new ConflictException('Club already exists');
        try {
            const newClub = await this.prisma.club.create({
                data: {
                    userId: userId,
                    title,
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
        catch {
            throw new BadRequestException("Required fields");
        }
        
        
    }
}