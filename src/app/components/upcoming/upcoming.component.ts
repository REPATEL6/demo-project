import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

enum Days {
  Today = 'today',
  Tomorrow = 'tomorrow',
  Upcoming = 'upcoming'
}

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnDestroy, OnInit {

  response: any;
  upcomingTaskForm: any;
  userid: number | undefined;
  datepipe: DatePipe;
  today = new Date();
  tomorrow = new Date();
  afterTomorrow = new Date();
  dateArray: Array<Date> = [];
  isTomorrowEmpty: boolean = true;
  isUpcomingEmpty: boolean = true;
  upcomingTaskLength:number = 0;

  constructor(public apiService: CallApiService, private activateRoute: ActivatedRoute, private route: Router, private dataService: DataService, private fb: FormBuilder) {
    if (sessionStorage.getItem("id") !== undefined) {
      this.userid = +sessionStorage.getItem("id")!;
    } else {
      sessionStorage.setItem("isLoggedIn", "false");
      console.log("userid is undefined");

      route.navigate(['/']);
    }
    // window.addEventListener('beforeunload', this.handleBeforeUnload);
    this.datepipe = new DatePipe('en-US');
    // this.today.setDate(this.today.getDate())
    // this.tomorrow.setDate(this.tomorrow.getDate() + 1)
    // this.afterTomorrow.setDate(this.afterTomorrow.getDate() + 2)
    // this.dateArray.push(this.today, this.tomorrow, this.afterTomorrow);

    this.dataService.onButtonClickAddtoUpc.subscribe((data: any) => {
      console.log("Helloooooooooooooooooooooooooooooooooo:", data);
      this.getUpcomingTaskDetails();
    });
  }

  // private handleBeforeUnload(event: Event) {
  // Perform your specific task here
  // console.log('User is refreshing or leaving the page.');
  // this.route.navigate(['/upcoming']);
  // // Optionally, return a message to prompt the user
  // const confirmationMessage = 'Changes you made may not be saved.';
  // (event as any).returnValue = confirmationMessage; // Standard for most browsers
  // return confirmationMessage; // For Safari
  // }

  // get from chatgpt for refreshing stuff
  // constructor(private router: Router) {
  //   // Subscribe to router events to handle navigation
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       // Logic to handle navigation end events if needed
  //     }
  //   });
  // }

  btnON() {
    this.dataService.storeData(undefined);
    this.dataService.onButtonClickTodtoAdd.next(undefined);
  }

  ngOnInit(): void {
    console.log("upcoming oninit");
    this.upcomingTaskForm = this.fb.group({
      today: new FormArray([]),
      tomorrow: new FormArray([]),
      upcoming: new FormArray([])
    });

    // let formattedDate = this.datepipe.transform(this.dateArray.at(1), 'YYYY-MM-dd')
    this.getUpcomingTaskDetails();
  }

  ngOnDestroy(): void {
    console.log("upcoming destroy");
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

  getUpcomingTaskDetails() {

    if (this.userid != undefined && this.userid != null) {
      this.apiService.getUpcomingTaskDetails(this.userid).subscribe({

        next: (data: any) => {
          console.log("upcoming data:", data.result);
          this.response = data.result as FormArray;
          this.filledDataEmpty();
          if (data.success == 1) {
            let count = 0;
            let todayTaskArray = this.upcomingTaskForm.get('today') as FormArray;
            let tomorrowTaskArray = this.upcomingTaskForm.get('tomorrow') as FormArray;
            let afterTomTaskArray = this.upcomingTaskForm.get('upcoming') as FormArray;

            let todayArray = data.result.at(0);
            let tomArray = data.result.at(1);
            let afterTomArray = data.result.at(2);

            this.upcomingTaskLength = todayArray.length + tomArray.length + afterTomArray.length;
            this.dataService.setUpcomingTaskListLength(this.upcomingTaskLength);

            for (let today of todayArray) {
              todayTaskArray.push(this.addTaskFormGroup());
              todayTaskArray.at(count++).patchValue(today);
            }
            count = 0;
            for (let tom of tomArray) {
              tomorrowTaskArray.push(this.addTaskFormGroup());
              tomorrowTaskArray.at(count++).patchValue(tom);
            }
            count = 0;
            for (let afterTom of afterTomArray) {
              afterTomTaskArray.push(this.addTaskFormGroup());
              afterTomTaskArray.at(count++).patchValue(afterTom);
            }
            if (tomArray.length > 0) this.isTomorrowEmpty = false;
            if (afterTomArray.length > 0) this.isUpcomingEmpty = false;
          }

        },
        error: (err: any) => {
          console.log("Err:", err);
        }
      });
    } else {
      console.log("userid is undefined");

      this.route.navigate(['/']);
    }
  }

  filledDataEmpty() {
    let taskArrayTod = this.upcomingTaskForm.get('today') as FormArray;
    let taskArrayTom = this.upcomingTaskForm.get('tomorrow') as FormArray;
    let taskArrayAfterTom = this.upcomingTaskForm.get('upcoming') as FormArray;

    for (let i = taskArrayTod.length - 1; i >= 0; i--) {
      taskArrayTod.removeAt(i);

    }
    for (let i = taskArrayTom.length - 1; i >= 0; i--) {
      taskArrayTom.removeAt(i);
    }
    for (let i = taskArrayAfterTom.length - 1; i >= 0; i--) {
      taskArrayAfterTom.removeAt(i);
    }
  }

  sentData(str: String, idx: number) {
    let val: String = str == Days.Today ? Days.Today : (str == Days.Tomorrow ? Days.Tomorrow : Days.Upcoming);
    console.log('val:', val);

    console.log("error: check: ", this.upcomingTaskForm.get(val).at(idx));
    const data = this.upcomingTaskForm.get(val).at(idx);
    console.log("clicked data", data.value);
    this.dataService.storeData(data.value);
    this.dataService.onButtonClickUpctoAdd.next(data.value);
    this.route.navigate(['/upcoming', 'addnewtask'], { skipLocationChange: true });
  }

}
