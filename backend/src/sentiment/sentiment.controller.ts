import { Controller,Post,Body, UseGuards } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { Prisma } from '@prisma/client';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { PassportJwtGuard } from 'src/auth/guards/passport-jwt.guard';

@UseGuards(PassportJwtGuard)
@Controller('analyse')
export class SentimentController {
    constructor(private readonly sentimentService:SentimentService){}
    
    @Post()
    
    async analyseAllComments(@Body() comments: CreateCommentDto[]){
        return this.sentimentService.analyseAllComments(comments);
    }
    @Post('oneComment')
    analyseOneComment(@Body() commentDto:CreateCommentDto){
        return this.sentimentService.analyseOneComment(commentDto);
    }
}
