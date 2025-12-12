import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

      lData:any;
   constructor(){
       this.lData = JSON.parse(localStorage.getItem('userData') || '[]');
   }

   rooms = [1,2,3,4,5,6,7,8,9,10];

   getRoomStatus(){
    debugger;
      const result = this.rooms.map(room =>{
        const count = this.lData.filter((x:any) =>  x.roomNo == room).length;
             let status='';
             if(count === 0 ){
              status = 'Available'
             }else if(count === 1){
              status = 'Partial Filllup'
             }else{
              status ='Full';
             }

             return {
              roomNo: room,
              count: count,
              status: status
             }
        })
        return result;
   }
  
}
