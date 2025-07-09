import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Query } from '@nestjs/common';
import {CommentsService} from './comments.service';
import { Prisma } from '@prisma/client';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService:CommentsService){}
    @Get() //get all comments with url=/comments 
    findAll(@Query('author')author?:string,/*@Query('prodname') prodName?:string,*/@Query('sentiment') sentiment?:string,@Query('date') date?:string){
        return this.commentsService.findAll(author,date,sentiment,/*prodName*/);
    }
    @Get(':id') //get comment by author with url=/comments/:author
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.commentsService.findOne(id);
    }
    @Post()
    create(@Body() createCommentDto:Prisma.commentCreateInput) { //submit info for creating new comment
        return this.commentsService.create(createCommentDto);                                    
    }
    @Patch(':id')
    update(@Param('id',ParseIntPipe)id:number, @Body() updateCommentDto:Prisma.commentUpdateInput){ // modify info in one comment by author
        return this.commentsService.update(id,updateCommentDto);
    }
    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.commentsService.delete(id);
    }

}
