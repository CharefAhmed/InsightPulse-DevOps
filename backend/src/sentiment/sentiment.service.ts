import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import OpenAI from 'openai';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class SentimentService {
    constructor(
        private readonly databaseService:DatabaseService,
        private readonly commentsService:CommentsService,
    ){}
        async analyseSentimentFromComment(comment:{content:string}){
            const prompt = `You are a sentiment analysis bot.Given a customer comment, classify the overall sentiment as one of the following:(Positive|Neutral|Negative) .Then, assign it a score from 1 to 5 based strictly based on sentiment:(1 = Extremely negative|2 = Negative|3 = Neutral|4 = Positive|5 = Extremely positive) Important: Sentiment and score must match logically,If you classify a comment as "Negative", the score must be 1 or 2,If you classify it as "Positive", the score must be 4 or 5,If "Neutral", then score must be 3.Comment: "${comment.content}".Return the result in this exact format: Sentiment: <positive|neutral|negative>
            Score: <1-5> `;

            try {
                const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3', 
                prompt: prompt,
                stream: false,
                });

                const result = response.data.response.trim();
                const lines = result.split('\n');
                const sentiment = lines[0].split(':')[1].trim();
                const score = lines[1].split(':')[1].trim();

                return [sentiment, score ];
            }catch (error) {
                console.error('Ollama sentiment analysis failed:', error.message);
                throw new Error('Sentiment analysis failed');
            }
        }
    async analyseAllComments(comments:CreateCommentDto[]){
        return await Promise.all(comments.map(async (comment,i)=>{
            console.log(`Comment[${i}]`, comment);
            const commentCreated=await this.commentsService.create(comment);
            const [sentiment,score] = await this.analyseSentimentFromComment(comment);
            return this.databaseService.analysisResult.create({
                data:{
                    sentiment,
                    score,
                    commentId: commentCreated.id,
                },
            })

        }));
    }
    async analyseOneComment(commentDto:CreateCommentDto){
        const comment=await this.commentsService.create(commentDto);
        const [sentiment, score] = await this.analyseSentimentFromComment(commentDto);
        return await this.databaseService.analysisResult.create({
            data: {
            sentiment,
            score,
            commentId: comment.id, 
            } 
        });
    }
}
