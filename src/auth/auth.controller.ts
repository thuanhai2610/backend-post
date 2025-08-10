import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-pass.dto';
import { ChangePasswordDto } from './dto/change-pass.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, password, role } = registerDto;
    return this.authService.register(email, password, role ?? 'user');
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('verify_otp')
  async verify_otp(@Body() body: { email: string; code: string }) {
    const { email, code } = body;
    return this.authService.verify_otp(email, code);
  }

  @Post('forgot_password')
  async forgot_password(@Body('email') email: string) {
    return this.authService.forgot_password(email);
  }

  @Post('reset_password')
  async reset_password(@Body() dto: ResetPasswordDto) {
    return this.authService.reset_password(
      dto.email,
      dto.newPassword,
      dto.otpCode,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('change_password')
  async changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    const userId = req.user['userId']; 
    return this.authService.change_password(
      userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }
}
