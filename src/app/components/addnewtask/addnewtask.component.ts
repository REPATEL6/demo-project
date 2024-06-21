import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-addnewtask',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addnewtask.component.html',
  styleUrl: './addnewtask.component.css'
})
export class AddnewtaskComponent {

  constructor(private dataService: DataService, private route: Router) {

    // Set min attribute of date input field to current date
    // const dateInput = document.getElementById('date') as HTMLInputElement;
    // dateInput.min = this.getCurrentDate();

  }

  btnOFF() {
    this.dataService.setBtnToogle(false);
  }

  // taskTitle = new FormControl("",[
  //   Validators.required,
  //   Validators.minLength(3)
  // ])

  // taskDecription = new FormControl("")

  // listName = new FormControl("")

  // dueDate = new FormControl("")

  // user_id = new FormControl("")

  // newTaskData = new FormGroup({
  //   taskName: this.taskTitle,
  //   taskDescription: this.taskDecription,
  //   listName: this.listName,
  //   dueDate: this.dueDate,
  //   user_id: this.user_id
  // })

  saveTask(taskName: any, taskDescription: any, listName: any, dueDate: any) {
    const user_id = +sessionStorage.getItem("id")!;
    const taskResponse = this.dataService.saveTaskDetails({ taskName, taskDescription, listName, dueDate, user_id })
      .subscribe((data: any) => {
        console.log("task resp:", data);
      })

    // this.savetaskService.saveDataInDB(this.newTaskData.value);
    this.route.navigate(['/']);
  }

  // Get current date in YYYY-MM-DD format
  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



}
