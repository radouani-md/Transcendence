import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { RegisterDto } from "./dtos/register.dto.js";



@Controller('api/user')
export class UserController {
    constructor (private readonly userService: UserService){}

    @Post('auth/register')
    public register(@Body() body: RegisterDto){
        return (this.userService.register(body))
    }


    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    public login(@Body() body: RegisterDto){
        return (this.userService.login(body))
    }

    

}