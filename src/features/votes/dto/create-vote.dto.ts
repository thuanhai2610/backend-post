// dto/create-vote.dto.ts
import { IsIn, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsIn([1, -1])
  type: number;

  @IsOptional()
  postId?: string;

  @IsOptional()
  commentId?: string;
}
