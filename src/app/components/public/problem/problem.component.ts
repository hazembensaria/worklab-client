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
  
    
    // this.route.queryParams.subscribe(params=>{
    //   console.log("params:params");
      
    //   this.ProblemId=params["id"];
    //   console.log("id:"+this.ProblemId);
      
    //   this.problemService.getProblem(this.ProblemId).subscribe(res=>{
    //     this.problem=res.problem;
    //     console.log("room problem:"+this.problem);
        
    //   },err=>{
    //     console.log("error");
        
    //   });
    // })
  }

  private initialse(){
    this.route.queryParams.subscribe(params => {
      this.workLabId = params['message'];
      // console.log(this.workLabId);
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
    });
  }



}
