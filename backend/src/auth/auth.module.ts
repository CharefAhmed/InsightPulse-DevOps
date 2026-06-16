import {  Module } from '@nestjs/common';
import { PassportAuthController } from './passport-auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule,JwtModule.registerAsync(
    {inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({
      global:true,
      secret: configService.get<string>('JWT_SECRET'),
      signOptions:{expiresIn: configService.get<string>('JWT_EXPIRES_IN')}
    })}
  ),PassportModule],
  controllers: [PassportAuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
