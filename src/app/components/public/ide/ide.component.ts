import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as ace from "ace-builds";
import { Action } from 'rxjs/internal/scheduler/Action';
import { CompilerService } from 'src/app/Services/compiler.service';
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';
import { CreateWorklabComponent } from '../dialog/create-worklab/create-worklab.component';
@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {

  constructor(private route :ActivatedRoute , private compilerService : CompilerService ,public dialog: MatDialog , private worklabService : WorklabService, private userService :UserService) { }
  code! :string
  user :any ;
  participants : any =[] ;
  compiledCode :any
  workLabId ! :string ;
  enableEditing = true
  workLab :any ; 
  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;
  
  ngOnInit(): void {
    // getMessage
    // const aceEditorr = ace.edit(this.editor.nativeElement);
    this.worklabService.socket?.on('getCode', (obj :any)=>{
      const aceEditor = ace.edit(this.editor.nativeElement);
      aceEditor.session.setValue(obj.msg);
   

      })
      this.worklabService.socket?.on('enableOk', (obj :any)=>{
        console.log("hi hazem from enable");
      const aceEditor = ace.edit(this.editor.nativeElement);
        
        aceEditor.setReadOnly(true)
  
        })

        this.worklabService.socket?.on('denableOk', (obj :any)=>{
          console.log("hi hazem from denable");
        const aceEditor = ace.edit(this.editor.nativeElement);
          
          aceEditor.setReadOnly(false)
    
          })

      this.worklabService.socket?.on('getExecuter', (obj :any)=>{
        const aceEditor = ace.edit(this.editor.nativeElement);  
        console.log(aceEditor.getValue());
        this.compilerService.compileCode(aceEditor.getValue()).subscribe(res=>{
          console.log(res);
          this.compiledCode = res
          
        })
        })
        this.worklabService.acceptEvent.subscribe(next=>{
          this.initialse();
        })
        this.initialse();


  }

  private async initialse(){
    
    this.route.paramMap.subscribe(param=>{
      this.workLabId=param.get("id")??""
      this.worklabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
        this.workLab = worklab ;
        this.participants = worklab.participants ;
        console.log(this.workLab.code);
        const aceEditor = ace.edit(this.editor.nativeElement);
        aceEditor.session.setValue(this.workLab.code);
        this.userService.getCurrentUser().subscribe(res=>{
          this.user = res ;
          this.participants.push({ name : "auther" , id : worklab.auther});
          this.participants = this.participants.filter((object :any) => {
            return object.id !== res._id;
          });
         })
      })
    })
  }
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    // ace.config.set("enableBasicAutocompletion" , true) ;
    // ace.config.set("enableLiveAutocompletion" , true) ;

    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    console.log(this.workLab?.code);
    
    const aceEditor = ace.edit(this.editor.nativeElement);
    // aceEditor.session.setValue(this.workLab?.code);
    // if(!this.enableEditing){ aceEditor.setReadOnly(true);}
    aceEditor.setTheme("ace/theme/tomorrow_night");
    aceEditor.session.setMode("ace/mode/javascript");
    aceEditor.setOptions({
      enableBasicAutocompletion : true,
      enableLiveAutocompletion :true ,
    })
    // aceEditor.on("change", () => {
    // this.worklabService.socket.emit("code" , {code : aceEditor.getValue() , auther : this.worklabService.auther})

    //   console.log(aceEditor.getValue());
    // });
  }
  execute(){
    this.worklabService.socket.emit("executer" , {auther : this.participants})
    console.log(this.participants);
    
    const aceEditor = ace.edit(this.editor.nativeElement);  
    
    this.compilerService.compileCode(aceEditor.getValue()).subscribe(res=>{
     
      this.compiledCode = res
      
    })
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateWorklabComponent);

 
  }
  change(){
    
    const aceEditor = ace.edit(this.editor.nativeElement);  
    this.worklabService.socket.emit("code" , {code : aceEditor.getValue() , auther : this.participants})


  }
  autoSaveCode(e : Event){
    // this.notificationService.socket.emit('updateArticle' , {collab :this.collaborators , title: this.title , section :this.section})
    const aceEditor = ace.edit(this.editor.nativeElement); 
  this.updateDebounceText(aceEditor.getValue())

  } 

  debounce(cb :Function , delay:number){
    let timout:any
    return(...args:any)=>{
      clearTimeout(timout)
     timout = setTimeout(() => {
          cb(...args)
      }, delay);
    }
  }

  updateDebounceText =this.debounce((text :any)=>{
    console.log("debounce hazem");
    
    const aceEditor = ace.edit(this.editor.nativeElement);  
          this.worklabService.saveCode(aceEditor.getValue() , this.workLab._id).subscribe(res=>{
          console.log("code saved ");
          
          })
      
        
  } , 2000)
}
