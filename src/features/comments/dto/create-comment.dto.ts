
import { IsNotEmpty, IsOptional } from 'class-validator';


export class CreateCommentDto {
  @IsNotEmpty()
  postId: string;

  @IsOptional()
  authorId: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  parentCommentId?: string;
}
