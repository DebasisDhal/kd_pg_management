import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { Rooms } from './pages/rooms/rooms';
import { LibaryUser } from './pages/libary-user/libary-user';
import { PgPayments } from './pages/pg-payments/pg-payments';

export const routes: Routes = [
    {
        path:'',
        component:Users
    },
    {
        path:'rooms',
        component:Rooms
    },
    {
        path:'libaryEntry',
        component:LibaryUser
    },
    {
        path:'pgPayment',
        component:PgPayments
    }
];
