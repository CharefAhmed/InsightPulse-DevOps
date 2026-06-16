import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as path from 'path';
import { Prisma } from '@prisma/client';
import { Readable } from 'stream';

@Injectable() 
export class UploadService {
    async processFile(file:Express.Multer.File){ 
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
        
        return comments;
    }
    
    private parseCSV(file: Express.Multer.File):Promise<any[]>{
        return new Promise((resolve,reject)=>{
            const results=[];
            const stream = Readable.from(file.buffer);
            stream.pipe(csv({
            mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, ''),
            }))
            .on('data',(data)=>{
                console.log('Raw CSV row:', data);
                const cleaned = {
                    content: data['content']?.trim(),
                    author: data['author']?.trim(),
                };
                results.push(cleaned);
            })
            .on('end',()=>resolve(results))
            .on('error',reject);
        })
    }
}
