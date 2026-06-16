import { IsString,IsNotEmpty, IsNumber } from "class-validator";
export class CreateCommentDto{
    @IsString()
    @IsNotEmpty()
    content:string;

    @IsString()
    @IsNotEmpty()
    author:string;

    @IsNumber()
    userId:number;
}