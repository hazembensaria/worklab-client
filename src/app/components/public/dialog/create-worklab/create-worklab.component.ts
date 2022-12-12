import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorklabService } from 'src/app/Services/workLab.service';

@Component({
  selector: 'app-create-worklab',
  templateUrl: './create-worklab.component.html',
  styleUrls: ['./create-worklab.component.css']
})
export class CreateWorklabComponent implements OnInit {

  constructor( private worklabService : WorklabService , private router :Router) { }
workLabName ! : string;
  ngOnInit(): void {
  }
onSubmit(){
  console.log(this.workLabName);
  this.worklabService.createWorklab(this.workLabName).subscribe(res=>{
    this.worklabService.openDialog.next(false);
    this.router.navigate([`worklab/${res}`])
    
  })
}
}
