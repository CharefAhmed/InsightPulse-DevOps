import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentsService {
    private comments=[
    {
        id: 0,
        content: "This article was super helpful. Thanks for sharing!",
        author: "John",
        createdAt: "2025-07-06"
    },
    {
        id:1,
        content : "I didn't fully understand the last sectio",
        author: "Alice ",
        createdAt: "2025-07-06"
    },
    {
        id:2,
        content: "Well written and straight to the point",
        author: "Ahmed",
        createdAt: "2025-07-05"
    }, 
]
findAll(){
    return this.comments;
}
findOne(id:number){
    const comment=this.comments.find(cmt=>cmt.id===id)
    if (comment===undefined){
        throw new NotFoundException('Comment Not Found');
    }
    return comment;
}
create(createCommentDto:CreateCommentDto){
    let id=this.comments.length;
    let createdAt=new Date().toISOString();
    const newComment={id,...createCommentDto,createdAt}
    this.comments.push(newComment);
    return newComment;
}
update(id:number,updateCommentDto:UpdateCommentDto)
{
    this.comments=this.comments.map(cmt=>{
        if(cmt.id===id){
            return{...cmt,...updateCommentDto};
        }
        return cmt;
    })
}
delete(id:number){
    const removedComment=this.findOne(id);
    this.comments=this.comments.filter(cmt=>cmt.id!==id);
    return removedComment;
}
}

