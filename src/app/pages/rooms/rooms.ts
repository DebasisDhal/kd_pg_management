import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rooms',
  imports: [CommonModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms implements OnInit{

  roomStatusList:any[]=[];

  constructor(private master:UserService){  }

  ngOnInit(){
     this.roomStatusList = this.master.getRoomStatus();
  }

}
