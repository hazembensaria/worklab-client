import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/Models/Problem.Model';
import { ProblemService } from 'src/app/Services/problem.service';
import { WorklabService } from 'src/app/Services/workLab.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  private ProblemId:string="";
  problem!:any;
  workLabId!: string
  workLab : any

  constructor(private route:ActivatedRoute,private problemService:ProblemService , private workLabService : WorklabService) { }

  ngOnInit(): void {

    this.initialse()
  
  }

  private initialse(){
    this.route.queryParams.subscribe(params => {
      this.workLabId = params['message'];

      if(this.workLabId){
        this.workLabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
          console.log(worklab);
          this.workLab = worklab
          console.log(this.workLab.problemId);
          if(this.workLab.problemId){
  
            this.problemService.getProblem(this.workLab.problemId).subscribe(res=>{
                this.problem = res.problem ;
                console.log(this.problem);
                
            })
          }
          
        })
      }
      else{
        const problemId = params['id'];
        this.problemService.getProblem(problemId).subscribe(res=>{
          this.problem = res.problem ;
          console.log(this.problem);
          
      })
      }
      // console.log(this.workLabId);
     
    });
  }



}
