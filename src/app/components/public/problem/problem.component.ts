import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/Models/Problem.Model';
import { ProblemService } from 'src/app/Services/problem.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  private ProblemId:string="";
  problem!:Problem;
  constructor(private route:ActivatedRoute,private problemService:ProblemService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params=>{
      console.log("params:params");
      
      this.ProblemId=params["id"];
      console.log("id:"+this.ProblemId);
      
      this.problemService.getProblem(this.ProblemId).subscribe(res=>{
        this.problem=res.problem;
        console.log("room problem:"+this.problem);
        
      },err=>{
        console.log("error");
        
      });
    })
  }



}
