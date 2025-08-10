import { IsEmail, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";


export class RegisterDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  role?: string;
}