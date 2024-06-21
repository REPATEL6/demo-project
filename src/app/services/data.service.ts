import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private resp!:any;
  base_url:String;

  constructor(private http: HttpClient) { 
    this.base_url= "http://localhost:8080/demo";
  }

  btnToggle?: boolean;

  getBtnToggle(): boolean {
    return this.btnToggle!;
  }

  setBtnToogle(toggle_value: boolean) {
    this.btnToggle = toggle_value;
  }

  // private http = Inject(HttpClient) 

  getData(): void {
    this.http.get("http://localhost:8080/demo").subscribe((data: any) => {
      console.log(data);
    });
  }

  signin(param:any) {
    console.warn("param",param)
    return this.http.post(this.base_url+"/signin", param)
  }

  signup(param:any) {
    console.warn("signup",param)
    return this.http.post(this.base_url+"/signup", param)
  }

  saveTaskDetails(param:any) {
    return this.http.post(this.base_url+"/savetask", param)
  }

  getTaskDetails(param:number) {
    return this.http.get(this.base_url+"/taskdetail?user_id="+param);
  }

  


}
