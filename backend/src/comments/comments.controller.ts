import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Query, ValidationPipe } from '@nestjs/common';
import {CommentsService} from './comments.service';
import { Prisma } from '@prisma/client';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService:CommentsService){}
    @Get() //get all comments with url=/comments 
    findAll(@Query('author')author?:string,@Query('sentiment') sentiment?:string,@Query('date') date?:string){
        return this.commentsService.findAll(author,date,sentiment,);
    }
    @Get(':id') //get comment by author with url=/comments/:author
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.commentsService.findOne(id);
    }
    @Post()
    create(@Body(ValidationPipe) createCommentDto:CreateCommentDto) { //submit info for creating new comment
        return this.commentsService.create(createCommentDto);                                    
    }
    @Patch(':id')
    update(@Param('id',ParseIntPipe)id:number, @Body() updateCommentDto:UpdateCommentDto){ // modify info in one comment by author
        return this.commentsService.update(id,updateCommentDto);
    }
    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.commentsService.delete(id);
    }

}
