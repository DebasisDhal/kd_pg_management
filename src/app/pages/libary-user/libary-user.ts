import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LibraryModel } from '../../core/libaryMember';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libary-user',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './libary-user.html',
  styleUrl: './libary-user.css',
})
export class LibaryUser {
   data:LibraryModel[] = JSON.parse(localStorage.getItem('libaryUser') || '[]');

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

}
