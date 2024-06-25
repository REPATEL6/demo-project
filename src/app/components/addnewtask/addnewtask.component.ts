import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormControlName } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-addnewtask',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addnewtask.component.html',
  styleUrl: './addnewtask.component.css'
})
export class AddnewtaskComponent implements OnDestroy {

  response: any;
  msgToDisplay: any;
  datas:any;
  constructor(private apiService: CallApiService, private route: Router, private dataService:DataService) { 
    this.datas = dataService.getStoredData();
    console.log("Constructor",this.datas);
    
  }

  btnOFF() {
    this.apiService.setBtnToogle(false);
  }

  saveTask(taskName: any, taskDescription: any, listName: any, dueDate: any) {
    const user_id = +sessionStorage.getItem("id")!;
    console.log(taskName, taskDescription, listName, dueDate, user_id);

    const taskResponse = this.apiService.saveTaskDetails({ taskName, taskDescription, listName, dueDate, user_id }).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          console.log("Success status:", data.success);
          this.response = data;
          if (data.success === 1) {
            this.response = data.result;
            console.log("Response:", data.result);
          } else {
            // this.response = data.msg;
            console.log("msgToDisplay:", this.response.msg);
            this.showErrMsg();
          }

        },
        error: (err: any) => {
          console.log("Err:", err);
        }
      }





      // {
      // next: (data: any) => {
      //       if (data.success == '1') {
      //         // this.response = data.result;
      // console.log("addnewtask", data);
      //         this.route.navigate(['/']);
      //       } else {
      // this.response = data.msg;
      // console.log("add new task", this.response);
      // this.showErrMsg();
      //     }
      //   },
      //   error: (err: any) => {
      //     console.log("Error", err);
      //   }
      // }
    )

  }

  // Get current date in YYYY-MM-DD format
  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  showErrMsg() {
    this.msgToDisplay = true;
    setTimeout(() => {
      this.msgToDisplay = false;
    }, 8000)
  }

  ngOnDestroy(): void {
    console.log("Destroy");
  }

}
