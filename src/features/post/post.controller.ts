import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, Request, BadRequestException, ForbiddenException } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostDto } from "./dto/create-post.dto";
import { JwtAuthGuard } from "src/common/jwt-auth.guard";

@Controller('posts')
export class PostController{
    constructor(private postService: PostService){}


    @UseGuards(JwtAuthGuard)
    @Post()
    async post_question(@Body() dto: PostDto, @Req() req: any){
        return this.postService.post_question(dto, req.user['userId']);
    }


    @Get('all')
    async findAll(){
        return this.postService.findAll()
    }

    @Get(':id')
    async findPostId(@Param('id') id:string ){
        return this.postService.findById(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletedPost(@Param('id') id: string, @Req() req: any): Promise<any>{
        const userId =  req.user['userId'];
       
        return this.postService.deletedPost(id, userId)
    }
}