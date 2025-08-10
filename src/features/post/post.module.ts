import {  Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Post, PostSchema } from './schemas/createpost.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentModule } from '../comments/comment.module';


@Module({
  imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]), CommentModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

