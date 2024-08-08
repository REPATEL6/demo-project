import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  base_url:String;
  base_url2:String;

  constructor(private http: HttpClient) { 
    this.base_url= "http://localhost:8081/demo";
    this.base_url2= "http://localhost:8081/task";
  }

  // btnToggle?: boolean;

  // getBtnToggle(): boolean {
  //   return this.btnToggle!;
  // }

  // setBtnToogle(toggle_value: boolean) {
  //   this.btnToggle = toggle_value;
  // }

  // private http = Inject(HttpClient) 

  getData(): void {
    this.http.get("http://localhost:8081/demo").subscribe((data: any) => {
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

  deleteTask(param:any) {
    return this.http.get(this.base_url+"/deletetask?taskId="+param);
  }

  getTaskDetails(param:number) {
    return this.http.get(this.base_url+"/taskdetail?user_id="+param);
  }

  getUpcomingTaskDetails(param:number) {
    return this.http.get(this.base_url2 + "/upcoming?user_id="+ param);
  }

}
