import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import * as bcrypt from 'bcrypt';
import { OtpService } from "src/otp/otp.service";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenService } from "src/tokens/refresh-token.service";
import { Types } from "mongoose";
@Injectable()
export class AuthService{
    constructor(private userService: UserService,
        private otpService: OtpService,
       private jwtService: JwtService,
       private refreshToken: RefreshTokenService
    ){}

    async validateUser(email: string, password: string){
        const user = await this.userService.validateUser(email,password);
        if (user) {
            const {password, ...result} = user;
            if (!result.role) {
                throw new BadRequestException('User role is missing');
            }
            return result;
        }
        return null;
    }
    async register(email: string, password: string, role: string = 'user'){
        const existed = await this.userService.findByEmail(email);
        if (existed) {
            if (existed.isVerified) 
                throw new ConflictException('Email has already. Please register different email.')
                const hashed = await bcrypt.hash(password, 10);
                await this.userService.updatePasswordAndResetOTP(String(existed._id), hashed);
                try {
                    await this.otpService.generateOTP(email);
                } catch (error) {
                    console.error('Send OTP failed ', error);
                    throw new InternalServerErrorException('OTP can not send')
                }
                return {message: 'OTP send successfully'}
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await this.userService.create({
            email,
            password: hashed,
            role,
            isVerified: false,
        });
        try {
            await this.otpService.generateOTP(email);
        } catch (error) {
            console.error('Send OTP failed ', error)
            throw new InternalServerErrorException('Dont can send OTP');
        }
        return {message: 'Register Successfullty ', user}

    }

    async login(email: string, password: string){
       const user = await this.userService.findByEmail(email);
       if (!user || !user.isVerified) throw new UnauthorizedException('User not register or User not verified');
        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new UnauthorizedException('Password not correct')

        const access = this.jwtService.sign({sub: user._id,email: user.email, role: user.role}, {expiresIn: '7d'})
        const refresh = this.jwtService.sign({sub: user._id}, {expiresIn: '30d'})

        await this.refreshToken.create(String(user._id), refresh);
        return {access_token: access, refresh_token: refresh}
    }

    async verify_otp(email: string, code: string){
        const valid = await this.otpService.verifyOtp(email, code);
        if(!valid) throw new UnauthorizedException('Invalid OTP code ');
        const verifyEmail = await this.userService.verifyEmail(email);
        return {message: 'Account activated ', verifyEmail}
    }

    async forgot_password(email: string){
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new BadRequestException('User not found');
        } try {
            await this.otpService.generateOTP(email)
            return {message: 'OTP sent to your email for Forgot Passwrod'};
        } catch (error) {
            console.error('Failed to sent OTP ', error)
            throw new InternalServerErrorException('Could not send OTP');
        }
    }

    async reset_password(email: string, newPassword: string, code: string){
        const user = await this.userService.findByEmail(email);
        if(!user) {
            throw new BadRequestException('User not found');
        }
        const isvalid = await this.otpService.verifyOtp(email, code);
        if (!isvalid) {
            throw new UnauthorizedException('Invalid or experied OTP');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userService.updateForgotPassword(String(user._id), hashedPassword);
        return {message: 'Password has been reset successfully'};
    }

    async change_password(userId: string, oldPassword: string, newPassword: string){
        const userObjectId = new Types.ObjectId(userId)
        const user = await this.userService.findById(userObjectId);
        if(!user) {throw new BadRequestException('User not found');
        }
        const match = await bcrypt.compare(oldPassword, user.password)
        if (!match) {
            throw new UnauthorizedException('Password not match');
        }
         const hashedNewPassword = await bcrypt.hash(newPassword,10);
         console.log(hashedNewPassword)
         await this.userService.updatePassword(userId, hashedNewPassword);

         return{message: 'Change password successfully'}
    }
}