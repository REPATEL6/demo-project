import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from './call-api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private route:Router, private apiService : CallApiService) {}

  onButtonClickTodtoAdd = new Subject();
  // onButtonClickAddtoTod = new Subject();
  // onButtonClickUpcoming = new Subject();
  
  data:any;
  idx?:number;

  storeData(val :any) {
    this.data = val;
  }

   getStoredData() {
    return this.data;
  }

}
