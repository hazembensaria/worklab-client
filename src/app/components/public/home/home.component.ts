import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }
  
  ngOnInit(): void {
  }
  // exucte(){
  //   const aceEditor = ace.edit(this.editor.nativeElement);
  //    const code = aceEditor.getValue();
  
  //    try{
  //   new Function(code)();
    

  //    }catch(err){
  //     console.log(err);
      
  //    }
  //  }
}
