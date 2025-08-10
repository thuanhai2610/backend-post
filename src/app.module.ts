import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './intercepter/logging.interceptor';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './features/post/post.module';
import { CommentModule } from './features/comments/comment.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),MongooseModule.forRoot('mongodb+srv://thuanhai:thuanhai123@cluster0.zeum7vn.mongodb.net/myposts?retryWrites=true&w=majority&appName=Cluster0'), AuthModule, PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    
  }
}
