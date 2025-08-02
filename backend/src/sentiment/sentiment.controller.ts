import { Controller,Post,Body, UseInterceptors, UploadedFile, Param, ParseIntPipe } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { Prisma } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@Controller('analyse')
export class SentimentController {
    constructor(private readonly sentimentService:SentimentService,
        private readonly uploadService:UploadService
    ){}
    
    @Post()
    
    async analyseAllComments(@Body() comments: CreateCommentDto[]){
        return this.sentimentService.analyseAllComments(comments);
    }
    @Post('oneComment')
    analyseOneComment(@Body() commentDto:CreateCommentDto){
        return this.sentimentService.analyseOneComment(commentDto);
    }
}
