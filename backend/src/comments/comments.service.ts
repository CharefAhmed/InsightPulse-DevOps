import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private readonly databaseService:DatabaseService ){}
    async findAll(author:string,date:string,sentiment:string){
        if(author){
            return this.databaseService.comment.findMany({
                where:{
                    author,
                }
            })
        }
        if(sentiment){
            return this.databaseService.comment.findMany({
                where:{
                    sentiment:{
                        sentiment,
                    }
                },
                include:{
                    sentiment:true,
                }
            })
        }
        if(date){
            const start = new Date(date);
            start.setUTCHours(0, 0, 0, 0);

            const end = new Date(date);
            end.setUTCHours(23, 59, 59, 999);
            return this.databaseService.comment.findMany({
                where:{
                    updateAt : {
                gte: start,
                lte: end,
                },
                }
            })
        }
        return this.databaseService.comment.findMany(
            {
                include:{
                    sentiment:true,
                }
            }
        );
    }
    async findOne(id:number){ // hadhi bich nesta3melha jul 31 2025
        
        return this.databaseService.comment.findUnique({
            where:{
                id,
            }
        });
    }
    async create(createCommentDto:CreateCommentDto){
        console.log("Creating comment with DTO:", createCommentDto);
        return this.databaseService.comment.create({
            data:{
                content: createCommentDto.content,
                author: createCommentDto.author,
            },
        });
    }
    async update(id:number,updateCommentDto:UpdateCommentDto){
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

