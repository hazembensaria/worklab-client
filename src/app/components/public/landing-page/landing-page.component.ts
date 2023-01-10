import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit , AfterViewInit {
  codeee :any 
  @ViewChild("editor")
  private editor!: ElementRef<HTMLElement>;
  constructor() { }
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    // ace.config.set("enableBasicAutocompletion" , true) ;
    // ace.config.set("enableLiveAutocompletion" , true) ;

    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("");
    aceEditor.setTheme("ace/theme/monokai");
    aceEditor.session.setMode("ace/mode/javascript");
    aceEditor.setOptions({
      enableBasicAutocompletion : true,
      enableLiveAutocompletion :true ,
    })
    // aceEditor.on("change", () => {
    //   console.log(aceEditor.getValue());
    // });
  }

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
