import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";
export type PostDocument = Post & Document;
@Schema({timestamps: true})
export class Post{
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    authorId: User;
      @Prop({required: true}) title: string;
    @Prop({required: true}) content: string;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}
export const PostSchema = SchemaFactory.createForClass(Post)