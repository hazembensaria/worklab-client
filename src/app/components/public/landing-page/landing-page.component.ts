import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { faGears , faBarsProgress , faUsersGear ,faGraduationCap , faComment , faQuestion , faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  codeee :any 
  usersGear = faUsersGear
  gear = faGears
  gc =faGraduationCap
  comment = faComment
  question =faQuestion
  magic = faWandMagicSparkles
  bar = faBarsProgress
  @ViewChild("editor")
  private editor!: ElementRef<HTMLElement>;
  constructor() { }
 
  ngOnInit(): void {
  }
  exucte(){
    const aceEditor = ace.edit(this.editor.nativeElement);
     const code = aceEditor.getValue();
  
     try{
    new Function(code)();
    

     }catch(err){
      
      
     }
   }
}
