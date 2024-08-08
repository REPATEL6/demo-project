import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { task } from '../../../models/taskDetails'
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';
import { AddnewtaskComponent } from '../addnewtask/addnewtask.component';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule, AddnewtaskComponent, FormsModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  userid: number | undefined;
  response: any;
  taskForm: any;

  @ViewChild(AddnewtaskComponent, { static: true }) addnewComp?: AddnewtaskComponent;

  dropdownOptions = [
    { id: 0, name: '-Select-' },
    { id: 1, name: 'work' },
    { id: 2, name: 'personal' },
    { id: 3, name: 'Option 3' }
  ];

  constructor(public apiService: CallApiService, private route: Router, private dataService: DataService, private activateRoute: ActivatedRoute, private fb: FormBuilder) {
    if (sessionStorage.getItem("id") !== undefined) {
      this.userid = +sessionStorage.getItem("id")!;
    } else {
      sessionStorage.setItem("isLoggedIn", "false");
      route.navigate(['/']);
    }
    this.dataService.onButtonClickAddtoTod.subscribe((data: any) => {
      console.log("Helloooooooooooooooooooooooooooooooooo:", data);
      this.getTasks();
    });
  }

  ngOnInit(): void {
    console.log("oninit");
    this.taskForm = this.fb.group({
      tasks: new FormArray([])
    })
    this.getTasks();
  }

  ngAfterViewInit(): void {
    console.log("afterViewInit");
  }

  ngOnChanges(): void {
    console.log("on Changes");

  }

  ngOnDestroy(): void {
  }

  btnON() {
    console.log("btn clicked");
    this.dataService.storeData(undefined);
    this.dataService.onButtonClickTodtoAdd.next(undefined);
  }

  addTaskFormGroup(): FormGroup {
    let newFormGroup = this.fb.group({
      id: [{ value: '', disabled: true }],
      taskName: [{ value: '', disabled: true }],
      taskDescription: [{ value: '', disabled: true }],
      listName: [{ value: '', disabled: true }],
      dueDate: [{ value: '', disabled: true }]
    });
    return newFormGroup;
  }


  getTasks() {
    if (this.userid !== undefined) {
      this.apiService.getTaskDetails(this.userid).subscribe((data: any) => {
        console.log("gettask data", data.result);
        this.filledDataEmpty();
        if (data.success === 1) {
          // this.response = data.result;
          // let taskFORM = this.taskForm as FormGroup;
          // taskFORM.reset();
          let count = 0;
          let taskArray = this.taskForm.get('tasks') as FormArray;
          for (let item of data.result) {
            taskArray.push(this.addTaskFormGroup());
            taskArray.at(count++).patchValue(item);
          }
        }

      })
    }
  }

  filledDataEmpty() {
    let taskArrays = this.taskForm.get('tasks') as FormArray;
    console.log("ArrayLength", taskArrays.length);
    // taskArrays.controls.forEach((element,idx) => {

    // });

    for (let i = taskArrays.length - 1; i >= 0; i--) {
      taskArrays.removeAt(i);
      // console.log("i:",i);

    }
  }

  // sentData(val: any) {
  //   console.log("getdata:", val)
  //   this.dataService.storeData(val);
  //   this.dataService.onButtonClickTodtoAdd.next(val);
  //   this.route.navigate(['/today', 'addnewtask'], { skipLocationChange: true });
  // }

  sentData(idx: number) {
    console.log("idx", idx);
    console.log("abc", this.taskForm.get('tasks').at(idx).get('listName').value);
    if (this.taskForm.get('tasks').at(idx).get('listName').value == '-Select-') {
      console.log("-select");
      this.taskForm.get('tasks').at(idx).get('listName').value = '';
    }
    console.log("abc", this.taskForm.get('tasks').at(idx).get('listName').value);
    const data = this.taskForm.get('tasks').at(idx);
    console.log("clicked data", data.value);
    this.dataService.storeData(data.value);
    this.dataService.onButtonClickTodtoAdd.next(data.value);
    this.route.navigate(['/today', 'addnewtask'], { skipLocationChange: true });
  }


}
