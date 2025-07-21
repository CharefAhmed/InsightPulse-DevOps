import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [CommentsModule, DatabaseModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
