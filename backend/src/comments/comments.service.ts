import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
    private comments=[
    {
        id: "0",
        content: "This article was super helpful. Thanks for sharing!",
        author: "John",
        createdAt: "2025-07-06"
    },
    {
        id:"1",
        content : "I didn't fully understand the last sectio",
        author: "Alice ",
        createdAt: "2025-07-06"
    },
    {
        id:"2",
        content: "Well written and straight to the point",
        author: "Ahmed",
        createdAt: "2025-07-05"
    }, 
]
findAll(){
    return this.comments;
}
findOne(id:string){
    const comment=this.comments.find(cmt=>cmt.id===id)
    return comment;
}
create(comment:{content:string,author:string,createdAt:string}){
    let id=this.comments.length.toString();
    const newComment={id,...comment}
    this.comments.push(newComment);
    return newComment;
}
update(id:string,commentUpdate:{content?:string,author?:string,createdAt?:string})
{
    this.comments=this.comments.map(cmt=>{
        if(cmt.id===id){
            return{...cmt,...commentUpdate};
        }
        return cmt;
    })
}
delete(id:string){
    const removedComment=this.findOne(id);
    this.comments=this.comments.filter(cmt=>cmt.id!==id);
    return removedComment;
}
}

