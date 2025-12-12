import { Injectable } from '@angular/core';
import { supabase } from '../../supabaseClient';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Library {

  private table ='library_users'

  getUserOnce(){
    return from(supabase.from(this.table).select('*').order('sit_no',{ascending: true}));
  }

  
}
