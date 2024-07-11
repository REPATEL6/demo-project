import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';

@Component({
   selector: 'app-addnewtask',
   standalone: true,
   imports: [ReactiveFormsModule, CommonModule, ReactiveFormsModule, RouterLink],
   templateUrl: './addnewtask.component.html',
   styleUrl: './addnewtask.component.css'
})
export class AddnewtaskComponent implements OnDestroy, OnInit {

   response: any;
   msgToDisplay: any;
   datas: any;
   taskForm!: FormGroup;

   dropdownOptions = [
      { id: 0, name: '-Select-' },
      { id: 1, name: 'work' },
      { id: 2, name: 'personal' },
      { id: 3, name: 'Option 3' }
   ];

   constructor(private apiService: CallApiService, private route: Router, private dataService: DataService, private fb: FormBuilder) {
      console.log("Constructor", this.datas);

      this.dataService.onButtonClick.subscribe((data: any) => {
         // console.log("called from today",data);
         this.saveTask(this.taskForm, 0);
         this.fillData(data);
      })

   }

   ngOnInit(): void {
      this.datas = this.dataService.getStoredData();

      console.log("ngOnInit of addnewtask");
      this.taskForm = this.fb.group({
         taskName: [''],
         taskDescription: [''],
         listName: [0],
         dueDate: [''],
         user_id: [+sessionStorage.getItem("id")!]
      })
      if (this.datas != null && this.datas !== undefined) {
         console.log("data arrived in new task component", this.datas);
         this.fillData(this.datas);
      }
   }


   btnOFF() {
      // this.apiService.setBtnToogle(false);
      this.route.navigate(['/']);
   }

   // saveTask(taskName: any, taskDescription: any, listName: any, dueDate: any) {
   saveTask(formData: FormGroup, num: number) {
      // const user_id = +sessionStorage.getItem("id")!;
      console.log(this.taskForm.value);

      // const taskResponse = this.apiService.saveTaskDetails({ taskName, taskDescription, listName, dueDate, user_id }).subscribe(
      // const taskResponse = this.apiService.saveTaskDetails(this.taskForm.value).subscribe(
      //   {
      //     next: (data: any) => {
      //       console.log(data);
      //       console.log("Success status:", data.success);
      //       this.response = data;
      //       if (data.success === 1) {
      //         this.response = data.result;
      //         console.log("Response:", data.result);
      //       } else {
      //         // this.response = data.msg;
      //         console.log("msgToDisplay:", this.response.msg);
      //         this.showErrMsg();
      //       }

      //     },
      //     error: (err: any) => {
      //       console.log("Err:", err);
      //     }
      //   });
      if (num === 1) {
         this.callSaveTaskApi(formData);
      } else if (num === 0) {
         formData.reset();
      }

   }

   callSaveTaskApi(formData: FormGroup) {
      const taskResponse = this.apiService.saveTaskDetails(this.taskForm.value).subscribe(
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
         });
   }

   // Get current date in YYYY-MM-DD format
   getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
      const day = String(now.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
   }

   showErrMsg() {
      this.msgToDisplay = true;
      setTimeout(() => {
         this.msgToDisplay = false;
      }, 8000)
   }

   ngOnDestroy(): void {
      console.log("Destroy");
      // this.apiService.setBtnToogle(false);
   }

   fillData(resp: any) {
      console.log("filldata", resp);
      if (resp != undefined || resp != null) {
         let idx = this.dropdownOptions.findIndex(option => option.name === resp.listName)
         if (idx === undefined || idx < 0) {
            idx = 0;
         }
         console.log("filldataindex", idx);
         // this.taskForm.reset();
         this.apiService.setBtnToogle(true);
         this.taskForm.patchValue({
            taskName: resp.taskName,
            taskDescription: resp.taskDescription,
            listName: idx,
            dueDate: resp.dueDate
         })
      }
      else{
         this.taskForm.patchValue({
            listName: 0
         })
      }
   }
}

