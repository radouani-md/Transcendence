import { Injectable } from "@nestjs/common";
import { Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";


@Injectable()
export class ReactionService
{
    constructor(private readonly prisma: PrismaService){}
    
    public likePost(userId: number, postId: number){
        
    }
}