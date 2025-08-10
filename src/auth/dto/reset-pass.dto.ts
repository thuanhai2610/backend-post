import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otpCode: string;

  @IsNotEmpty()
  newPassword: string;
}
