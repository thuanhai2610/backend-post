import {  Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';



@Module({
  imports: [MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [MongooseModule]
})
export class CommentModule {}

