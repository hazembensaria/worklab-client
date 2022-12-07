import { Component, OnInit } from '@angular/core';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService : UserService){}
  ngOnInit(): void {
    this.userService.autoAuthUser()
  }
  title = 'worklab';
}
