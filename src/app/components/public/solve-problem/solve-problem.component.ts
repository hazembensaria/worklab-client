import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solve-problem',
  templateUrl: './solve-problem.component.html',
  styleUrls: ['./solve-problem.component.css']
})
export class SolveProblemComponent implements OnInit {

  ProblemId:string|null=""
  constructor(private router:Router,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

   const problemId=this.activateRoute.snapshot.paramMap.get('id')
   console.log("problemid from solve prob commponnets",problemId);
   
   if(problemId){
 
      this.ProblemId=problemId;

   
   }
   
  }

  routing(route:string){

    console.log("problemid from solve prob commponnets routing",this.ProblemId);

    
    this.router.navigate([`solveProblem/${this.ProblemId}/${route}`],{queryParams:{id:this.ProblemId}})
  }

}
