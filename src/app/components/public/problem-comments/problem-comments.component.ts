import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProblemService } from 'src/app/Services/problem.service';
import { Problem } from 'src/app/Models/Problem.Model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-problem-comments',
  templateUrl: './problem-comments.component.html',
  styleUrls: ['./problem-comments.component.css']
})
export class ProblemCommentsComponent implements OnInit {

  @ViewChild ('comment') comment!:ElementRef

  problem!:Problem
  comments!:{authorId:string,comment:string}[]|null


  constructor(private problemService:ProblemService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("amine");
    
    this.route.queryParams.subscribe(params => {
      const problemId = params['id'];
      this.problemService.getProblem(problemId).subscribe(res=>{
        this.problem=res.problem
        this.comments=this.problem.comments
        console.log("comments:",this.problem.comments);
        
      })
    })
  }

  addComment(){
    if(this.comment.nativeElement.value!=""){
      console.log(this.comment.nativeElement.value);
      
      this.problemService.addComment(this.comment.nativeElement.value,this.problem._id).subscribe(res=>{
       
        this.comments?.push({authorId:res.userId,comment:this.comment.nativeElement.value})
        alert("added")
        this.comment.nativeElement.value="";
      })
    }
  }

}
