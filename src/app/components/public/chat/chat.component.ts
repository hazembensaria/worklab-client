import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';
// import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private workLabService :WorklabService , private route : ActivatedRoute , private userService : UserService) { }
workLabId !: string ;
chat: any =[] ;
plan =faPaperPlane ;
message : string ="" ;
showDat =false ;
participants : any =[] ;
typingPeople  = new Set();
@ViewChild("chatbox") private chatBox!: ElementRef<HTMLElement>;
user : any ;
  ngOnInit(): void {
    
    this.workLabService.socket?.on('getTyping', (obj :any)=>{
      this.typingPeople.add(obj.msg);
      })
      this.workLabService.socket?.on('getDeleteTyping', (obj :any)=>{
        console.log("deleting");
        if(this.typingPeople.has(obj.msg))
        this.typingPeople.delete(obj.msg);
        })
  

    this.workLabService.socket?.on('getMessage', (obj :any)=>{
      console.log(obj.msg);
      this.typingPeople.delete(obj.msg.name)
      this.chat.unshift(obj.msg);
      })


     this.workLabService.acceptEvent.subscribe(next=>{
      this.initialse()
     })
   this.initialse()
  }

 private initialse(){
    this.route.paramMap.subscribe(param=>{
      this.workLabId=param.get("id")??""
      this.workLabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
        this.chat =worklab.chat.reverse() ;
        this.userService.getCurrentUser().subscribe(res=>{
          this.user = res ;
          this.participants = worklab.participants ;
          this.participants.push({ name : "auther" , id : worklab.auther});
          this.participants = this.participants.filter((object :any) => {
            return object.id !== res._id;
          });

         })
      })
    })
  }
onSubmit(){
  console.log(this.message);
  this.workLabService.addMessage(this.message ,this.user.name , this.workLabId).subscribe(res=>{
    console.log(res);
    const obj ={
      name : this.user.name ,
      sender : this.user._id,
      msg : this.message ,
      id : this.workLabId ,
      date : new Date()
    }
    console.log(obj);
    
    this.workLabService.socket.emit("sendMessage" , {message : obj , auther : this.participants})
    this.chat.unshift(obj);
    this.message ="";
  })
}
showDate(){
  this.showDat =!this.showDat
}
typing(){

  
  console.log(this.message);

  this.workLabService.socket.emit("sendTyping" , {message : this.user.name , auther : this.participants})

  
}
deleteMsg(){
  if(this.message === "")
  this.workLabService.socket.emit("deleteTyping" , {message : this.user.name , auther : this.participants})

}
}
