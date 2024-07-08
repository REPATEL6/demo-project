import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet , ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { task } from '../../../models/taskDetails'
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';
import { AddnewtaskComponent } from '../addnewtask/addnewtask.component';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule, ReactiveFormsModule,AddnewtaskComponent],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent implements OnInit {
  userid: number | undefined;
  response?:any[];
  taskList!:any;

  constructor(public apiService:CallApiService, private route:Router, private dataService: DataService, private activatedRoute:ActivatedRoute, private fb:FormBuilder ) {
    if(sessionStorage.getItem("id") !== undefined){
      this.userid = +sessionStorage.getItem("id")!;
    }else{
      sessionStorage.setItem("isLoggedIn","false");
      route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.getTasks();  
    console.log("oninit");
      
  }

  btnON() {
    this.apiService.setBtnToogle(true);
  }

  callAddNewTaskComp(data:any, idx:number) {
    // data[idx];
    console.log("At index:",data.id);
    
    // this.dataService.onButtonClick.next(this.response);
  }

  getTasks():any {
    if(this.userid !== undefined){
      this.apiService.getTaskDetails(this.userid).subscribe((data:any) => {
        console.log("gettask data",data.result);
        // console.log("gettask data",typeof data.result);
        this.response = data.result;
        // return this.response;
      })
    }
  }

  sentData(val: any, idx:number) {
    console.log("getdata:", val)
    if(this.apiService.getBtnToggle()){
      this.apiService.setBtnToogle(false);
      console.log(false);
      
    }
    this.btnON();
    this.dataService.storeData(val);
    this.callAddNewTaskComp(val, idx);
    this.ngOnInit()
    this.route.navigate(['/today','addnewtask'], {skipLocationChange : true});
  }
  

}
