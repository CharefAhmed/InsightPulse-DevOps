import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { PassportJwtGuard } from 'src/auth/guards/passport-jwt.guard';

@UseGuards(PassportJwtGuard)
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }
    @Get()
    findAll(@Query('author') author?: string, @Query('sentiment') sentiment?: string, @Query('date') date?: string, @Query('userId', ParseIntPipe) userId?: number) {
        return this.commentsService.findAll(author, date, sentiment, userId);
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.findOne(id);
    }
    @Post()
    create(@Body(ValidationPipe) createCommentDto: CreateCommentDto) {
        console.log("Controller DTO received:", createCommentDto);
        return this.commentsService.create(createCommentDto);
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(id, updateCommentDto);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.delete(id);
    }

}
