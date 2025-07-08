import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
    constructor(private readonly databaseService:DatabaseService ){}
    async findAll(){
        return this.databaseService.comment.findMany();
    }
    async findOne(id:number){
        
        return this.databaseService.comment.findUnique({
            where:{
                id,
            }
        });
    }
    async create(createCommentDto:Prisma.commentCreateInput){
        return this.databaseService.comment.create({
            data:createCommentDto
        });
    }
    async update(id:number,updateCommentDto:Prisma.commentUpdateInput){
        return this.databaseService.comment.update({
            where:{
                id,
            },
            data:updateCommentDto,
        });
        
    }
    async delete(id:number){
        return this.databaseService.comment.delete({
            where:{id}
        });
    }
}

