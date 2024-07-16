import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
   putEmpty?: boolean;

   dropdownOptions = [
      { id: 0, name: '-Select-' },
      { id: 1, name: 'work' },
      { id: 2, name: 'personal' },
      { id: 3, name: 'Option 3' }
   ];

   constructor(private apiService: CallApiService, private route: Router, private dataService: DataService, private fb: FormBuilder, private activateRoute: ActivatedRoute) {
      console.log("Constructor", this.datas);

      this.dataService.onButtonClickTodtoAdd.subscribe((data: any) => {
         console.log("called from today", data);

         if (data !== undefined) {
            this.fillData(data);
         }
         else {
            console.log("undefined");
            this.putEmpty = true;
            this.fillDataEmpty();
         }
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
      if (this.datas != null && this.datas !== undefined && this.datas != '') {
         if (!this.putEmpty) {
            console.log("putEmpty:",this.putEmpty);
            
            console.log("data arrived in new task component", this.datas);
            this.fillData(this.datas);
         }
      }
   }


   btnOFF = () => {
      this.route.navigate(['../'], { relativeTo: this.activateRoute });
   }

   saveTask(formData: FormGroup, num: number) {
      console.log(this.taskForm.value);
      if (num > 0) {
         this.dropdownOptions.forEach((value, idx) => {
            if (idx === this.taskForm.value.listName) {
               this.taskForm.value.listName = value.name;
            }
         })
         console.log(this.taskForm.value.listName);
         this.callSaveTaskApi(formData);

      }
   }

   callSaveTaskApi(formData: FormGroup) {
      const taskResponse = this.apiService.saveTaskDetails(formData.value).subscribe(
         {
            next: (data: any) => {
               console.log(data);
               console.log("Success status:", data.success);
               this.response = data;
               if (data.success === 1) {
                  this.response = data.result;
                  console.log("Response:", data.result);
                  // this.dataService.onButtonClickAddtoTod.next("hello");
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

   fillData(resp: any) {
      console.log("filldata", resp);
      if (resp != undefined || resp != null) {
         let idx = this.dropdownOptions.findIndex(option => option.name === resp.listName)
         if (idx === undefined || idx < 0) {
            idx = 0;
         }
         console.log("filldataindex", idx);
         console.log("filldatalistname", resp.listName);
         this.taskForm.patchValue({
            taskName: resp.taskName,
            taskDescription: resp.taskDescription,
            listName: idx,
            dueDate: resp.dueDate
         })
      }
   }

   fillDataEmpty() {
      this.taskForm.patchValue({
         taskName: '',
         taskDescription: '',
         listName: 0,
         dueDate: ''
      })
   }
}

