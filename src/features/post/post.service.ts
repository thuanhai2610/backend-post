import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/createpost.schema';
import { Model } from 'mongoose';
import { PostDto } from './dto/create-post.dto';
import { Comment, CommentDocument } from '../comments/schemas/comment.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly model: Model<PostDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async post_question(dto: PostDto, authorId: string): Promise<Post> {
    return this.model.create({ ...dto, authorId });
  }

  async findAll(): Promise<any[]> {
    const posts = await this.model
      .find()
      .populate('authorId', '_id email')
      .lean();

    return  Promise.all(
      posts.map((post => this.attachCommentsToPosts(post))),
    );;
  }

  async findById(id: string): Promise<any> {
    const post = await this.model.findById(id).populate('authorId').lean();
    
    return this.attachCommentsToPosts(post);
  }

  private async attachCommentsToPosts(post: any): Promise<any> {
    const comments = await this.commentModel
          .find({ postId: post._id })
          .populate('authorId', 'email')
          .lean().exec();

            return {
          ...post,
          comments,
        };
  }

   async deletedPost(postId: string, userId: string): Promise<any>{ 
       const post = await this.model.findById(postId);
       if (!post) {
        throw new NotFoundException('Post not found');
       }
       if (!post.authorId || post.authorId.toString() !== userId.toString() ) {
          throw new ForbiddenException('You are not authoried delete to this post.')
       }
       await this.commentModel.deleteMany({postId: post._id})
       await this.model.findByIdAndDelete(postId);
       return { message: 'Post delete successfully! ', post}
   }
}
