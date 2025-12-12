import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LibraryModel } from '../../core/libaryMember';
import { CommonModule } from '@angular/common';
import { Library } from './library';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-libary-user',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './libary-user.html',
  styleUrl: './libary-user.css',
})
export class LibaryUser implements OnInit{
  
   data:LibraryModel[] = JSON.parse(localStorage.getItem('libaryUser') || '[]');
   userList:any[] = [];

   constructor(private master:Library,private cd: ChangeDetectorRef, private ngZone: NgZone){

  }

  ngOnInit(): void {
    this.onGetData();
    
  }

 async onGetData() {
  try {
    const res: any = await firstValueFrom(this.master.getUserOnce());
    this.userList = this.toCamelCase(res.data) || [];
    this.cd.detectChanges();
    console.log(this.userList, 'userList (after await)');
    // safe to use userList here
  } catch (err) {
    console.error('Fetch error', err);
  }
     console.log(this.userList, 'userList (after await)');
}
   

newLibaryUser: FormGroup = new FormGroup({
  sitNo: new FormControl<number>(0),
  firstName: new FormControl<string>(''),
  lastName: new FormControl<string>(''),
  whatsappNo: new FormControl<string>(''),
  idProof: new FormControl<string>(''),
  joinDate: new FormControl<string>(''),
  depositeAmount: new FormControl<number>(0),
});


  onSubmit(){
     const user:LibraryModel = this.newLibaryUser.value as LibraryModel;
    this.data.push(user);
    localStorage.setItem('libaryUser', JSON.stringify(this.data));
    console.log(this.data,'lbiaryData')
    
  }

 toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => this.toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: any, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
      result[camelKey] = this.toCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}



}
