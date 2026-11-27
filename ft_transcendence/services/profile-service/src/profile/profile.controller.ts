import { 
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body, 
    Req,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    BadGatewayException,
    BadRequestException
} from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileAuthGuard } from './guards/porfile-Auth.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { UpdateEmailDto } from './dto/update-email.dto.js';
import { UpdateBioDto } from './dto/update-bio.dto.js';
import { UpdateUsernameDto } from './dto/update-username.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Express, Response } from 'express';

interface AuthenticateReqoust {
    user?: {
        id?: number;
        userId?: number;
        sub?: number;
    }
}

@Controller("api/profile/me")
export class ProfileController {

    constructor (
        private readonly profileService: ProfileService,
    ){}

    @Get()
    @UseGuards(ProfileAuthGuard)
    getMyProfile(@Req() req: AuthenticateReqoust) {

        const userId = req.user?.id;

        if (!Number.isSafeInteger(userId) || !userId) {
            throw new UnauthorizedException();
        }

        return this.profileService.getProfile(userId);
    }

    @Patch('username')
    @UseGuards(ProfileAuthGuard)
    updateUsername(@Req() req:AuthenticateReqoust, @Body() body: UpdateUsernameDto) {
        
        return this.profileService.updateUsername(req.user?.id, body.username);
    }

    @Patch('email')
    @UseGuards(ProfileAuthGuard)
    updateEmail(@Req() req:AuthenticateReqoust, @Body() body: UpdateEmailDto) {

        return this.profileService.updateEmail(req.user?.id, body.email);
    }

    @Patch('password')
    @UseGuards(ProfileAuthGuard)
    changePassword(@Req() req:AuthenticateReqoust, @Body() body: ChangePasswordDto) {

        return this.profileService.changePassword(
            req.user?.id,
            body.currentPassword,
            body.newPassword,
            body.confirmPassword
        );
    }

    @Patch('bio')
    @UseGuards(ProfileAuthGuard)
    updateBio(@Req() req:AuthenticateReqoust, @Body() body: UpdateBioDto) {

        return this.profileService.updateBio(req.user?.id, body.bio);
    }


    @Patch('avatar')
    @UseGuards(ProfileAuthGuard)
    @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
        destination: './images/users',
        filename: (req, file, cb) => {
            const prefix = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
            const extension = file.originalname.split('.').pop();
            cb(null, `${prefix}.${extension}`);
        },
        }),
        fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new BadRequestException('Unsupported image format'), false);
        }
        },
        limits: { fileSize: 10 * 1024 * 1024 },
    }),
    )
    public uploadProfileImage(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: AuthenticateReqoust,
        ) {
        const userId = req.user?.id;

        if (!userId) {
            throw new UnauthorizedException();
        }
        if (!file) {
            throw new BadRequestException('No image provided');
        }

        return this.profileService.setProfileImage(userId, file.filename);
    } 

    @Patch('cover')
    @UseGuards(ProfileAuthGuard)
    @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
        destination: './images/cover',
        filename: (req, file, cb) => {
            const prefix = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
            const extension = file.originalname.split('.').pop();
            cb(null, `${prefix}.${extension}`);
        },
        }),
        fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new BadRequestException('Unsupported image format'), false);
        }
        },
        limits: { fileSize: 10 * 1024 * 1024 },
    }),
    )
    public uploadProfileCoverImage(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: AuthenticateReqoust,
        ) {
        const userId = req.user?.id;

        if (!userId) {
            throw new UnauthorizedException();
        }
        if (!file) {
            throw new BadRequestException('No image provided');
        }

        return this.profileService.setProfileCoverImage(userId, file.filename);
    }

    @Delete('bio')
    @UseGuards(ProfileAuthGuard)
    public async removeProfileBio(@Req() req: AuthenticateReqoust){
        const userId = req.user?.id;
        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();

        return this.profileService.removeBio(userId);
    }

    @Delete('avatar')
    @UseGuards(ProfileAuthGuard)
    public async removeProfileImage(@Req() req: AuthenticateReqoust){
        const userId = req.user?.id;
        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();

        return this.profileService.removeImgae(userId);
    }

    @Delete('cover')
    @UseGuards(ProfileAuthGuard)
    public async removeProfileCoverImage(@Req() req: AuthenticateReqoust){
        const userId = req.user?.id;
        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();

        return this.profileService.removeCoverImgae(userId);
    }

    @Delete()
    @UseGuards(ProfileAuthGuard)
    deleteUser(@Req() req: AuthenticateReqoust){
        const userId = req.user?.id;

        if (!Number.isInteger(userId) || !userId)
            throw new UnauthorizedException();

        return this.profileService.deleteUser(userId);

    }

}


