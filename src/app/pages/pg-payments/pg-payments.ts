import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { kdPaymentModel } from '../../core/commonModel';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-pg-payments',
  imports: [MatButtonModule,MatDatepickerModule,FormsModule,MatSelectModule,MatTableModule,CommonModule, MatIconModule, MatCardModule, FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './pg-payments.html',
  styleUrl: './pg-payments.css',
})
export class PgPayments implements OnInit{

  displayedColumns:string[]=['position','payMonth','userName','roomNo','paymentDate','modeOfPay','amount','remaningAmount','edit']
   dataSource :any;
  paymentValue:kdPaymentModel[]=[];
  totalRent =4000;
  selectedMonth!:string;
  allPayments: any[] = [];

months = [
  { name: 'January', value: '01' },
  { name: 'February', value: '02' },
  { name: 'March', value: '03' },
  { name: 'April', value: '04' },
  { name: 'May', value: '05' },
  { name: 'June', value: '06' },
  { name: 'July', value: '07' },
  { name: 'August', value: '08' },
  { name: 'September', value: '09' },
  { name: 'October', value: '10' },
  { name: 'November', value: '11' },
  { name: 'December', value: '12' }
];
  editData: any;
  constructor(){

  }
  ngOnInit() {
    this.getDataOn();
  }

  kdPayment:FormGroup = new FormGroup({
     userId: new FormControl(1),
    rMonth:new FormControl(''),
    userName:new FormControl(''),
    roomNo:new FormControl(''),
    paymentDate: new FormControl(''),
    amount:new FormControl(''),
    modeOfPay:new FormControl('')
  })

onSubmit() {
  if (this.kdPayment.invalid) {
    return;
  }

  // Load existing data
  const storedData = JSON.parse(localStorage.getItem('kd_payment') || '[]');

  if (this.editData) {
    // ✏️ UPDATE MODE
    const index = storedData.findIndex(
      (item: any) => item.userId === this.editData.userId
    );

    if (index !== -1) {
      storedData[index] = {
        ...storedData[index],
        ...this.kdPayment.value
      };
    }

    this.editData = null;

  } else {
    // ➕ ADD MODE
    const newPayment = {
      ...this.kdPayment.value,
      userId: storedData.length
        ? Math.max(...storedData.map((p: any) => p.userId)) + 1
        : 1
    };

    storedData.unshift(newPayment);
  }

  // 💾 Save to localStorage
  localStorage.setItem('kd_payment', JSON.stringify(storedData));

  // 🔄 Refresh UI
  this.getDataOn();

  // ♻️ Reset form
  this.kdPayment.reset();
}

  getDataOn(){
    const oldData = JSON.parse(localStorage.getItem('kd_payment') || '[]');
    // const ld = oldData ? JSON.parse(oldData): [];
    this.allPayments = oldData;
    this.dataSource = [...this.allPayments];
    this.calculateAmount();
  }

  getRAmount(paidAmount:number):number{
    const rAmount = this.totalRent- (paidAmount ||0);
     return rAmount;
  }


onMonthChange(){
  debugger;
 
    // if(!this.selectedMonth){
      this.dataSource = this.allPayments.filter((x:any) => x.rMonth==this.selectedMonth);
      console.log(this.dataSource,"fData");
      
    // }
}

getMonth(month:string){
   return this.months.find(x=>x.value==month)?.name || '';
}

onEdit(data:any){
    this.kdPayment.patchValue(data);
   this.editData = data;
}

totalReciveAmount=0;
remaningAmount=0;
calculateAmount(){
  for(let i of this.dataSource){
   this.totalReciveAmount += i.amount ;
  }
this.remaningAmount =   this.dataSource.length *4000 - this.totalReciveAmount ; 
}


}
