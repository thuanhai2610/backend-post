// src/auth/dto/change-password.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class ChangePasswordDto {


  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
