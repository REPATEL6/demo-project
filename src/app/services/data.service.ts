import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from './call-api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private resp!:any;
  // base_url:String;

  // constructor(private http: HttpClient) { 
  //   this.base_url= "http://localhost:8080/demo";
  // }

  constructor(private route:Router, private apiService : CallApiService) {}

  onButtonClick = new Subject();
  
  data:any;

  storeData(val :any) {
    this.data = val;
    this.apiService.setBtnToogle(true);
    console.log("btn value:",this.apiService.getBtnToggle());
    
    // this.route.navigate(['/addnewtask']);
  }

  getStoredData() {
    return this.data;
  }

}
