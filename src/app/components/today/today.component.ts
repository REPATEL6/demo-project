import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class TodayComponent implements OnInit, AfterViewInit {
  userid: number | undefined;
  response?:any[];
  taskList!:any;

  @ViewChild(AddnewtaskComponent, {static: true}) addnewComp? : AddnewtaskComponent;
  
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

  ngAfterViewInit(): void {
    // this.addnewComp?.fillData(this.response)
  }

  btnON() {
  //   this.apiService.setBtnToogle(true);
  this.dataService.onButtonClick.next(undefined);
  }
  btnOFF() {
  //   this.apiService.setBtnToogle(false);
  }

  // callAddNewTaskComp(data:any, idx:number) {
    // data[idx];
    // console.log("At index:",data.id);
    
    // this.dataService.onButtonClick.next(this.response);
  // }

  getTasks():any {
    if(this.userid !== undefined){
      this.apiService.getTaskDetails(this.userid).subscribe((data:any) => {
        console.log("gettask data",data.result);
        this.response = data.result;
      })
    }
  }

  sentData(val: any) {
    console.log("getdata:", val)
    // if(this.apiService.getBtnToggle()){
    //   this.apiService.setBtnToogle(false);
    // }
    // this.btnOFF();
    this.dataService.storeData(val);
    // this.addnewComp!.ngOnDestroy();
    // this.btnON();
    // this.addnewComp?.fillData(val)
    // this.callAddNewTaskComp(val, idx);
    this.dataService.onButtonClick.next(val);
    // this.ngOnInit()
    this.route.navigate(['/today','addnewtask'], {skipLocationChange : true});
  }
  

}
