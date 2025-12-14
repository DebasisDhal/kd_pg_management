import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  // userData!: UserObj;  
  sortBy:string='';
  searchBy:string ='';
  userForm!:FormGroup
  userList:userModel[] = []; 
  editId: any;

  constructor(private userMaster: UserService){
    this.crateForm();
   const lData = localStorage.getItem('userData');
   if(lData != null){
      this.userList = JSON.parse(lData);
        console.log('raw localStorage.userData:', this.userList);
   }
  }

  userObj: userModel = new userModel()
ngOnInit(){
}

crateForm(){

  this.userForm = new FormGroup({
    userId: new FormControl(this.userObj.userId),
    firstName: new FormControl(this.userObj.firstName),
    lastName: new FormControl(),
    address:new FormControl(this.userObj.address),
    occupation:new FormControl(this.userObj.occupation),
    idProof:new FormControl(this.userObj.idProof),
    id:new FormControl(this.userObj.id),
    isFood:new FormControl(this.userObj.isFood),
    islibary:new FormControl(this.userObj.islibary),
    libary:new FormControl(this.userObj.libary),
    entryDate:new FormControl(this.userObj.entryDate),
    depositeAmount:new FormControl(this.userObj.depositeAmount),
    about:new FormControl(this.userObj.about),
    roomNo:new FormControl(this.userObj.roomNo),
  })
}

onSubmit(){
  const oldData = localStorage.getItem('userData');
  
  if(oldData != null){
    const parseData = JSON.parse(oldData);
     this.userForm.controls['userId'].setValue(parseData.length +1)
        this.userList.unshift(this.userForm.value);

  }else{
    this.userList.unshift(this.userForm.value);
  }
  localStorage.setItem("userData",JSON.stringify(this.userList));
    this.userForm.reset();
}
onEdit(data:any){
   this.userForm.patchValue(data);
   this.editId = data.userId;

}
onUpdate() {
  const id = this.editId;
  const newData = this.userForm.value;

  const index = this.userList.findIndex(u => u.userId === id);


  // merge old & new data (and keep same id)
  this.userList[index] = {
    ...this.userList[index],  // old data
    ...newData,
    // id
  };

  // 3️⃣ reset
  this.editId = null;
  this.userForm.reset();
    localStorage.setItem('userData',JSON.stringify(this.userList));

}

onDelete(data:any){
  this.userList = this.userList.filter(u=>u.userId !== data);

  localStorage.setItem('userData',JSON.stringify(this.userList));

}

getNextMonthDate(dateString:any){
  const date  = new Date(dateString);

  //next month same day
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());

    // format (DD-MM-YYYY)
  const dd = String(nextMonth.getDate()).padStart(2, '0');
  const mm = String(nextMonth.getMonth() + 1).padStart(2, '0');
  const yyyy = nextMonth.getFullYear();

 const remaningDays =  this.getDaysFromToday(nextMonth);
  return remaningDays;
  return `${dd}-${mm}-${yyyy}`;
}

getDaysFromToday(nextMonthDate: any): number {
  const today = new Date();                 // always today
  const next = new Date(nextMonthDate);     // parameter

  const diffMs = next.getTime() - today.getTime();
  
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));  // convert to days
}

sendWhatsApp(phone: string, message: string) {
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}


}

export class userModel{
  userId:number;
  firstName:String;
  lastName:String;
  address:String;
  occupation:String;
  idProof:String;
  id:string;
  entryDate:String;
  isFood:boolean;
  libary:string;
  islibary:string;
  about:string;
  depositeAmount:string;
  roomNo:number;

  constructor(){
    this.userId =1;
    this.firstName = '',
    this.lastName = '',
    this.address='',
    this.occupation='',
    this.idProof='',
    this.id='',
    this.entryDate='',
    this.isFood= false,
    this.libary =''
    this.islibary='',
    this.about='',
    this.depositeAmount =''
    this.roomNo=0;
  }
}
