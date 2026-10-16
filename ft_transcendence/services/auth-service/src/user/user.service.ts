import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import * as bcrypt from 'bcryptjs'
import { LoginDto } from "./dtos/login.dto.js";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService

    ) {}

    public async register(registerDto: RegisterDto){
        const { email, password, username} = registerDto;

        const user = await this.prisma.user.findUnique({
            where: { email }
        })
        if (user){
            throw new BadRequestException('Email already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt)

        let newUser = await this.prisma.user.create({
            data: {
                email,
                username,
                password: hashedPass
            },
            select:{
                id: true,
                email: true,
                username:true
            }
        })
        const accessToken = await this.jwtService.signAsync({
            sub: newUser.id
        })
        return ({user: newUser, accessToken});
    }

    public async login(loginDto: LoginDto){
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: {email}
        })
        if (!user)
            throw new BadRequestException("invalid email or password")

        if (! await bcrypt.compare(password, user.password))
            throw new BadRequestException("The password is incorecct")

        const accessToken = await this.jwtService.signAsync({
            sub: user.id
        });

        return ({accessToken, user});
    }


}