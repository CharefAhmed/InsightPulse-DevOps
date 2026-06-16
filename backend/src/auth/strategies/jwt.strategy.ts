import {  Injectable,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { Request} from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request)=>{
                    return req?.cookies?.accessToken || null;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    
    async validate(payload: any) {
        if (!payload) throw new UnauthorizedException();
        return { message: "Same User Is Still Connected "};
    }
}