import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Model } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentService{
    constructor(@InjectModel(Comment.name) private readonly model:Model<CommentDocument>){}
     

    async createComment(dto: CreateCommentDto & {authorId: string}){
        return this.model.create(dto)
    }

    async findByPostId(postId: string):Promise<any[]> {
        return  this.model.find({postId}).populate('authorId', '_id email').lean().exec()
    }



}