import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcryptjs'; 
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { join } from 'node:path';
import { unlinkSync } from 'node:fs';
import { DEFAULT_AVATAR_IMAGE,
    DEFAULT_COVER_IMAGE,
    IMAGE_PATH_USERS,
    IMAGE_PATH_COVER,
 } from '../constants/constants.js';

@Injectable()
export class ProfileService {
    constructor (
        private readonly prisma : PrismaService,
    ){}

    private async hashPassword(password: string){
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async getProfile(id : number) {
        return this.prisma.user.findUnique({
            where: {id},
            omit:{
                password: true,
            }
        });
    }


    async updateUsername(userId: number | undefined, newUsername: string | undefined) {

        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();

        const user = await this.getProfile(userId);

        if (!user)
            throw new NotFoundException('Profile not found');

        const updatedUser = await this.prisma.user.update({
            where:{id: userId},
            data:{
                username: newUsername,
            },
            omit:{
                password: true,
            }
        });
        return updatedUser;
    }

    async updateEmail(userId: number | undefined, newEmail: string | undefined) {

        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();
        if (!newEmail)
            throw new BadRequestException('Email is required');

        const profile = await this.getProfile(userId);

        if (!profile)
            throw new NotFoundException('Profile not found');

        const existingUser = await this.prisma.user.findUnique({where: { email: newEmail },});
        if (existingUser && existingUser.id !== userId)
            throw new ConflictException('Email already in use');

        const updatedUser = await this.prisma.user.update({
            where:{id: userId},
            data:{
                email: newEmail,
            },
            omit: {
                password: true,
            }
        });
        return {
            message: 'Email updated successfully',
            user: updatedUser,
        }
    }

    async changePassword(userId: number | undefined, currentPassword: string | undefined, newPassword: string | undefined, confirmPassword: string | undefined) {
        
        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();

        if (newPassword != confirmPassword)
            throw new BadRequestException('Passwords do not match');


        const user = await this.prisma.user.findUnique({
            where: {id: userId},
            select:{
                id: true,
                password: true,
            }
        });
        if (!user)
            throw new NotFoundException('user not found');

        if (!newPassword || !currentPassword || !confirmPassword) {
            throw new BadRequestException('All password fields are required');
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid)
            throw new UnauthorizedException('Current password is incorrect');

        const hashedPassword = await this.hashPassword(newPassword);

        const updateUser = await this.prisma.user.update({
            where:{id: userId},
            data:{
                password: hashedPassword,
            },
            omit:{
                password: true,
            },
        });
        return {
            message: 'Password updated successfully',
        };
    }

    async updateBio(userId: number | undefined, newBio: string | undefined) {

        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();

        const profile = await this.getProfile(userId);
        if (!profile)
            throw new NotFoundException('Profile not found');

        const updatedProfile = await this.prisma.user.update({
            where:{id: userId},
            data:{
                bio: newBio,
            },
            omit: {
                password: true,
            },
        });
        return updatedProfile;
    }

    public async setProfileImage(id: number, newProfileImage: string){
        const user = await this.getProfile(id);
        if (!user)
            throw new NotFoundException("user not found");
        const oldAvatar = user.avatarUrl;

        const uploadImage = await this.prisma.user.update({
            where: {id},
            data: {
                avatarUrl: newProfileImage,
            },
            omit:{
                password: true,
            },
        });

        if (oldAvatar !== DEFAULT_AVATAR_IMAGE){
            const imagePath = join(process.cwd(), `${IMAGE_PATH_USERS}${user.avatarUrl}`);
            unlinkSync(imagePath);
        }

        return uploadImage;
    }


    public async setProfileCoverImage(id: number, newProfileConverImage: string){
        const user = await this.getProfile(id);

        if (!user)
            throw new NotFoundException("user not found");

        const oldCover =  user.coverUrl;

        const uploadImage = await this.prisma.user.update({
            where: {id},
            data: {
                coverUrl: newProfileConverImage,
            },
            omit:{
                password: true,
            },
        });

        if (oldCover !== DEFAULT_COVER_IMAGE) {
            const imagePath = join(process.cwd(), `${IMAGE_PATH_COVER}${user.coverUrl}`);
            unlinkSync(imagePath);
        }

        return uploadImage;
    }

    public async removeBio (id: number) {
        const profile = await this.getProfile(id);
        if(!profile)
            throw new NotFoundException("Profile not found");

        await this.prisma.user.update({
            where: {id},
            data: {
                bio: null,
            },
            omit:{
                password: true,
            },
        });

        return {
            message: 'Bio delete successfully',
        }
    }

    public async removeImgae(id: number){
        const user = await this.getProfile(id);
        if (!user)
            throw new NotFoundException("user not found");

        if (user.avatarUrl === DEFAULT_AVATAR_IMAGE)
            throw new NotFoundException("image not found");

        const imagePath = join(process.cwd(), `${IMAGE_PATH_USERS}${user.avatarUrl}`);
        unlinkSync(imagePath);

        await this.prisma.user.update({
            where: {id},
            data: {
                avatarUrl: DEFAULT_AVATAR_IMAGE,
            },
            select:{
                id: true,
                avatarUrl: true,
            },
        });

        return {
            message: 'Image delete successfully',
        }
    }

    public async removeCoverImgae(id: number){
        const user = await this.getProfile(id);
        if (!user)
            throw new NotFoundException("user not found");

        if (user.coverUrl === DEFAULT_COVER_IMAGE)
            throw new NotFoundException("image not found");

        const imagePath = join(process.cwd(), `${IMAGE_PATH_COVER}${user.coverUrl}`);
        unlinkSync(imagePath);

        await this.prisma.user.update({
            where: {id},
            data: {
                coverUrl: DEFAULT_COVER_IMAGE,
            },
            select:{
                id: true,
                coverUrl: true,
            },
        });

        return {
            message: 'Image delete successfully',
        }
    }

    async deleteUser(id: number){
        const profile = await this.getProfile(id);
        if (!profile)
            throw new NotFoundException('Profile not found');

        await this.prisma.user.delete({where:{id}});  
        
        return {
            message: 'Profile delete successfully',
        }
    }
    
}

