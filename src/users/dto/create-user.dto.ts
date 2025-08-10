import { IsNotEmpty } from "@nestjs/class-validator";

export class UserDto{
    @IsNotEmpty() email: string;
    @IsNotEmpty() password: string;
    @IsNotEmpty() role: string;
}