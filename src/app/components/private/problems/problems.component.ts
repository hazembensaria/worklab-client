import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Problem } from 'src/app/Models/Problem.Model';
import { AdminService } from 'src/app/Services/admin.service';
import { ProblemService } from 'src/app/Services/problem.service';
import { WorklabService } from 'src/app/Services/workLab.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  @ViewChild('difficulty') diffculty!: ElementRef;

  isAdmin:boolean=true
  addProblemPopUp:boolean=false
  popup:boolean=false;
  problemName:string="";
  selectedDifficulty:string="Eassy"
  verifyPassword:boolean=false;
  problem!:Problem;
  ProblemId:string="";

  problemDescription:String="";

  constructor(private adminService:AdminService,private router:Router,private problemService:ProblemService,private worklabService:WorklabService) { }
 //Problems:string []=['aa','bb','cc','dd','ee','gg','sfd','sdlkfj'] ;
 Problems:Problem []=[]
 

   ngOnInit (): void {
    console.log("from ng onint");
    
     this.fetchProblems();
   
    
    
  }

  showPopUp(problem:Problem,id:string){
    this.ProblemId=id;
    console.log("popup");
    this.problemName=problem.name
    this.problemDescription=problem.description;
    this.popup=!this.popup
  }

  onAddProblem(myForm:NgForm){
     this.problem={name:myForm.value.problemName,description:myForm.value.problemDescription,difficulty:this.selectedDifficulty,_id:""}
     this.verifyPassword=true;
     this.addProblemPopUp=false;
     
  }

  showAddProblemPopUp(){
    this.addProblemPopUp=!this.addProblemPopUp
  }

  onChangeDifficulty(){
    console.log(this.diffculty.nativeElement.value );
    
    this.selectedDifficulty=this.diffculty.nativeElement.value ;
  }


  //---------------------------------------verify admin password to add new problem----------------------------------

  onSubmitPassword(myForm:NgForm){
      this.adminService.addProblem(this.problem,myForm.value.password).subscribe(res=>{
        console.log("res"+res.added);
        if (res.added){
          this.showVerifiedPasswordPopUp();
          alert("problem added succfuly");
          this.Problems.push(this.problem);
        }
        
       
        
      },err=>{
        console.log("hello from catch on submit password",err);
        alert("password incorrect try again");
        this.showAddProblemPopUp();
        
      })
  }

  //-----------------------------------------show verifi password popUp--------------------------

  showVerifiedPasswordPopUp(){
    this.verifyPassword=false;
  }

  //------------------------------------------fetch problems from db------------------------

  fetchProblems (){
    this.problemService.fetchProblems().subscribe(res=>{
      console.log("my res ",res);
      res.problems.map((problem,index)=>{
        this.Problems[index]=problem
      })
      
    })
    console.log("hiprob"+this.Problems.length);
    
  }

  createRoom(workLabName:string,id:string){
    console.log(workLabName);
    
    this.worklabService.createWorklab(workLabName).subscribe(res=>{
      this.router.navigate([`worklab/${res}`],{ queryParams: { id: id }});
      
    })
  }
}
