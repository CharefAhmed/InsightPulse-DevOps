import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService }  from '../users/users.service'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService:JwtService
    ){}
    async validateUser(input:{email: string,password: string}){
        const user = await this.usersService.findOneByEmail(input.email);
        if(!user){throw new UnauthorizedException('User Not Found');}
        const correct =await bcrypt.compare(input.password,user.password);
        if(correct){
            return{
                userId:user.id,
                username:user.username,
                email:user.email
            };
        }
        return null;
    }
    async sign(signInput: {userId:number,username:string}){
        const payload={sub:signInput.userId,username:signInput.username};
        const accessToken= await this.jwtService.signAsync(payload);
        const refreshToken= await this.jwtService.signAsync(payload,{
            secret: process.env.REFRESH_JWT_SECRET,
            expiresIn:process.env.REFRESH_JWT_EXPIRES_IN,
        })
        return{
            accessToken,
            refreshToken,
            username: signInput.username,
            userId: signInput.userId
        }
    }
    async refreshToken(refreshToken: string){
        try{
            const payload = await this.jwtService.verifyAsync(refreshToken,{
            secret: process.env.REFRESH_JWT_SECRET,
        })
        const { sub, username } = payload;
        return await this.jwtService.signAsync({ sub, username });
        }catch(err){
            throw new UnauthorizedException('Invalid or Expired Refresh Token')
        }
    }
    
}
