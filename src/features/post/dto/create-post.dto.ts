import { IsOptional } from "@nestjs/class-validator";
import { IsNotEmpty } from "class-validator";

export class PostDto{
    @IsOptional() authorId: string;
    @IsNotEmpty() title: string;
   @IsNotEmpty() content: string;

   @IsOptional()  createAt: Date;
   @IsOptional()  updateAt: Date;

}