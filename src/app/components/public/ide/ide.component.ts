import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as ace from "ace-builds";
import { CompilerService } from 'src/app/Services/compiler.service';
import { CreateWorklabComponent } from '../dialog/create-worklab/create-worklab.component';
@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {

  constructor(private compilerService : CompilerService ,public dialog: MatDialog) { }
  code! :string
  compiledCode :any
  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;
  ngOnInit(): void {
  }
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
    aceEditor.setTheme("ace/theme/tomorrow_night");
    aceEditor.session.setMode("ace/mode/javascript");
    aceEditor.setOptions({
      enableBasicAutocompletion : true,
      enableLiveAutocompletion :true ,
    })
    // aceEditor.on("change", () => {
    //   console.log(aceEditor.getValue());
    // });
  }
  execute(){
    const aceEditor = ace.edit(this.editor.nativeElement);  
    console.log(aceEditor.getValue());
    this.compilerService.compileCode(aceEditor.getValue()).subscribe(res=>{
      console.log(res);
      this.compiledCode = res
      
    })
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateWorklabComponent);

 
  }
}
