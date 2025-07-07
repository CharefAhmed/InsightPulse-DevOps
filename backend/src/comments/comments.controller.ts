import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {CommentsService} from './comments.service'

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService:CommentsService){}
    @Get() //get all comments with url=/comments 
    findAll(){
        return this.commentsService.findAll();
    }
    @Get(':id') //get comment by author with url=/comments/:author
    findOne(@Param('id') id:string){
        return this.commentsService.findOne(id);
    }
    @Post()
    create(@Body() comment:{content:string,author:string,createdAt:string}) { //submit info for creating new comment
        return this.commentsService.create(comment);                                    
    }
    @Patch(':id')
    update(@Param('id')id:string, @Body() commentUpdate:{}){ // modify info in one comment by author
        return {id,...commentUpdate};
    }
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.commentsService.delete(id);
    }

}
