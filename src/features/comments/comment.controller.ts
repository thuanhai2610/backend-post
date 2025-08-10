import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { JwtAuthGuard } from "src/common/jwt-auth.guard";

@Controller('comments')
export class CommentController{
    constructor(private commentService: CommentService){}
     @UseGuards(JwtAuthGuard)
    @Post()
    async commentPost(@Body() dto: CreateCommentDto, @Req() req: any){
        const userId = req.user['userId']
        return this.commentService.createComment({...dto, authorId: userId})
    }

    @Get('posts/:postId')
    async findId(@Param('postId') postId: string){
        return this.commentService.findByPostId(postId);
    }

}