import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { Prisma } from '@prisma/client';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
    constructor(private readonly databaseService:DatabaseService){}
    async processFile(file:Express.Multer.File){
        //clear the daatabase 
        await this.databaseService.analysisResult.deleteMany();
        await this .databaseService.comment.deleteMany();
        //parse file :csv/json
        const extension= path.extname(file.originalname);
        let comments:Prisma.commentCreateInput []=[];
        if(extension==='.csv'){
            comments=await this.parseCSV(file);
        
        }else if(extension==='.json'){
            const json=JSON.parse(file.buffer.toString('utf-8'));
            comments=Array.isArray(json)?json:[json];
        }else {
            throw new Error('Unsupported file type');
        }
        for (const comment of comments) {
            await this.databaseService.comment.create({
            data: {
                content: comment.content,
                author: comment.author,
                createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date(),
                
            },
            });
        }
        return { message: 'File uploaded and comments stored successfully.' };
    }
    
    private parseCSV(file: Express.Multer.File):Promise<any[]>{
        return new Promise((resolve,reject)=>{
            const results=[];
            const stream = Readable.from(file.buffer);
            stream.pipe(csv())
            .on('data',(data)=>results.push(data))
            .on('end',()=>resolve(results))
            .on('error',reject);
        })
    }
}
