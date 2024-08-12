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
  onButtonClickAddtoTod = new Subject();
  onButtonClickAddtoUpc = new Subject();
  onButtonClickUpctoAdd = new Subject();
  
  data:any;
  idx?:number;
  upcomingTaskListLength : number = 0;
  todayTaskListLength : number = 0;

  storeData(val :any) {
    this.data = val;
  }

   getStoredData() {
    return this.data;
  }

  setUpcomingTaskListLength(val : number) {
    this.upcomingTaskListLength = val;
  }

  getUpcomingTaskListLength() {
    return this.upcomingTaskListLength;
  }

  setTodayTaskListLength(val : number) {
    this.todayTaskListLength = val;
  }

  getTodayTaskListLength() {
    return this.todayTaskListLength;
  }

}
