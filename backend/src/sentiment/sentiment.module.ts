import { Module } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { SentimentController } from './sentiment.controller';
import {ConfigModule, ConfigService} from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [ConfigModule,DatabaseModule,UploadModule,CommentsModule],
  controllers: [SentimentController],
  providers: [SentimentService,],
  exports:[SentimentService],
})
export class SentimentModule {}
