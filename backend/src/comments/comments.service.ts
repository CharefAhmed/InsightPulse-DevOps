import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private readonly databaseService:DatabaseService ){}
    async findAll(author:string,date:string,sentiment:string,userId:number){
        if(author){
            return this.databaseService.comment.findMany({
                where:{
                    author,
                }
            })
        }
        if(sentiment && userId){
            return this.databaseService.comment.findMany({
                where:{
                    userId,
                    sentiment:{
                        sentiment,
                    },
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
                where:{
                userId:userId,
                },
                include:{
                    sentiment:true,
                }
            }
        );
    }
    async findOne(id:number){ 
        
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
                userId: createCommentDto.userId
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

