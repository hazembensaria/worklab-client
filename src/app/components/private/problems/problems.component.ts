import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Problem } from 'src/app/Models/Problem.Model';
import { User } from 'src/app/Models/user-model';
import { AdminService } from 'src/app/Services/admin.service';
import { ProblemService } from 'src/app/Services/problem.service';
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  @ViewChild('difficulty') diffculty!: ElementRef;
  @ViewChild('category') category!: ElementRef;


  isAdmin: boolean = false
  addProblemPopUp: boolean = false
  popup: boolean = false;
  problemName: string = "";
  selectedDifficulty: string = "Eassy"
  selectedCategory:string="Map"
  verifyPassword: boolean = false;
  problem!: Problem;
  ProblemId: string = "";
  isLogedIn: boolean = false
  user!: User;

  problemDescription: String = "";

  constructor(private adminService: AdminService, private router: Router, private problemService: ProblemService, private worklabService: WorklabService, private userService: UserService) { }
  //Problems:string []=['aa','bb','cc','dd','ee','gg','sfd','sdlkfj'] ;
  Problems: Problem[] = []


  ngOnInit(): void {
    console.log("from ng onint");

    this.fetchProblems();
    this.userService.getCurrentUser().subscribe(user=>{
      this.user=user;
      this.isLogedIn=true;
      console.log("from problems this.user",this.user);
      
      this.isAdmin=(this.user.role=="admin") ?true:false
    })


  }

  showPopUp(problem: Problem, id: string) {
    this.ProblemId = id;
    console.log("popup");
    this.problemName = problem.name
    this.problemDescription = problem.description;
    this.popup = !this.popup
  }

  onAddProblem(myForm: NgForm) {
    this.problem = { name: myForm.value.problemName, description: myForm.value.problemDescription, difficulty: this.selectedDifficulty, _id: "",category:this.selectedCategory ,comments:null}
    this.verifyPassword = true;
    this.addProblemPopUp = false;

  }

  showAddProblemPopUp() {
    this.addProblemPopUp = !this.addProblemPopUp
  }

  onChangeDifficulty() {
    console.log(this.diffculty.nativeElement.value);

    this.selectedDifficulty = this.diffculty.nativeElement.value;
  }


  //---------------------------------------verify admin password to add new problem----------------------------------

  onSubmitPassword(myForm: NgForm) {
    this.adminService.addProblem(this.problem, myForm.value.password).subscribe(res => {
      
      if (res.problem) {
        this.showVerifiedPasswordPopUp();
        alert("problem added succfuly");
        this.Problems.push(res.problem);
      }



    }, err => {
      console.log("hello from catch on submit password", err);
      alert("password incorrect try again");
      this.showAddProblemPopUp();

    })
  }

  //-----------------------------------------show verifi password popUp--------------------------

  showVerifiedPasswordPopUp() {
    this.verifyPassword = false;
  }

  //------------------------------------------fetch problems from db------------------------

  fetchProblems() {
    this.problemService.fetchProblems().subscribe(res => {
      console.log("my res ", res);
      res.problems.map((problem, index) => {
        this.Problems[index] = problem
      })

    })
    console.log("hiprob" + this.Problems.length);

  }

  createRoom(workLabName: string, id: string) {
    // console.log(workLabName);
    console.log(this.ProblemId);

    this.worklabService.createWorklab(workLabName, this.ProblemId).subscribe(res => {
      console.log(res);

      this.router.navigate([`worklab/${res}/problem`], { queryParams: { message: res } });

    })
  }
  //----------------------------set category variable onchange------------------------
  onChangeCategory(){
    this.selectedCategory=this.category.nativeElement.value;
  }

  //---------------------------
  solveProblem(id:string){
          this.router.navigate([`solveProblem/${id}/problem`],{queryParams:{id:id}})
  }
}
