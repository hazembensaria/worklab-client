import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Problem } from 'src/app/Models/Problem.Model';
import { AdminService } from 'src/app/Services/admin.service';

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
  problem!:Problem

  constructor(private adminService:AdminService) { }
 Problems:string []=['aa','bb','cc','dd','ee','gg','sfd','sdlkfj'] ;
 

  ngOnInit(): void {
  }

  showPopUp(problem:string,index:number){
    console.log("popup");
    this.problemName=problem
    this.popup=!this.popup
  }

  onAddProblem(myForm:NgForm){

    
      this.problem={name:myForm.value.problemName,description:myForm.value.problemDescription,difficulty:this.selectedDifficulty}
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

  onSubmitPassword(myForm:NgForm){
      this.adminService.addProblem(this.problem,myForm.value.password).subscribe(res=>{
        console.log("res"+res.added);
        if (res.added){
          this.showVerifiedPasswordPopUp();
          alert("problem added succfuly");
        }
        
       
        
      },err=>{
        console.log(err);
        alert("password incorrect try again");
        this.showAddProblemPopUp();
        
      })
  }

  showVerifiedPasswordPopUp(){
    this.verifyPassword=false;
  }
}
