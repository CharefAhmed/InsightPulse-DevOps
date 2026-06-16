import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { SentimentModule } from './sentiment/sentiment.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),CommentsModule, DatabaseModule, UploadModule, SentimentModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
