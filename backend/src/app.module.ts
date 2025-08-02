import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { SentimentModule } from './sentiment/sentiment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // This should be relative to process.cwd(), which is `backend/` when you run `npm start`
    }),CommentsModule, DatabaseModule, UploadModule, SentimentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
