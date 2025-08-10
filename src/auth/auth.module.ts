import {  Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/users/user.module';
import { OtpModule } from 'src/otp/otp.module';
import { RefreshModule } from 'src/tokens/refresh-token.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/common/jwt.strategy';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),JwtModule.register({secret: process.env.JWTSECRET}), PassportModule, UserModule, OtpModule, RefreshModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

