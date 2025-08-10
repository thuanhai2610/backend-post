// vote.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VoteDocument = Vote & Document;

@Schema({ timestamps: true })
export class Vote {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  postId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  commentId?: Types.ObjectId;

  @Prop({ required: true, enum: [1, -1] }) // 1 = upvote, -1 = downvote
  type: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
