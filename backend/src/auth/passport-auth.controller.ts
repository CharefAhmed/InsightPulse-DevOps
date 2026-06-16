import { Controller, HttpCode, HttpStatus, Post,Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { Response } from 'express';


@Controller('auth')
export class PassportAuthController {
    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(PassportLocalGuard)
    @Post('login')
    async login(@Request() req , @Res({passthrough: true }) res:Response){
        const tokenData= await this.authService.sign(req.user);
        res.cookie('accessToken', tokenData.accessToken,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 15,
            //  maxAge: 1000 * 60 ,
        })
        res.cookie('refreshToken', tokenData.refreshToken,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
            // maxAge: 1000 * 60 ,
        })
        return {
            message:"Login Successfully",
            user:{
                id:tokenData.userId,
                username:tokenData.username
            }
        }
    }
    @Post('refresh')
    async refresh (@Request() req ,@Res({passthrough:true}) res:Response){
        const refreshToken= req.cookies?.refreshToken;
        if(!refreshToken) throw new UnauthorizedException('No Refresh Token Found in Cookies');
        const newAccessToken= await this.authService.refreshToken(refreshToken);
        res.cookie("accessToken",newAccessToken,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 15,
            // maxAge: 1000 * 60 ,
        })
        
    }
}
