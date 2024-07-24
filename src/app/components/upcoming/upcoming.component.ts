import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnDestroy, OnInit {

  response: any;
  upcomingTaskForm: any;
  userid: number | undefined;

  constructor(public apiService: CallApiService, private activateRoute: ActivatedRoute, private route: Router, private dataService: DataService, private fb: FormBuilder) {
    if (sessionStorage.getItem("id") !== undefined) {
      this.userid = +sessionStorage.getItem("id")!;
    } else {
      sessionStorage.setItem("isLoggedIn", "false");
      console.log("userid is undefined");
      
      route.navigate(['/']);
    }
  }

  btnOFF() {
    // this.apiService.setBtnToogle(true);
    // this.dataService.onButtonClickUpcoming.next(undefined);
  }

  ngOnInit(): void {
    console.log("upcoming oninit");
    this.upcomingTaskForm = this.fb.group({
      today: new FormArray([]),
      tomorrow: new FormArray([]),
      upcoming: new FormArray([])
    });

    this.getUpcomingTaskDetails();
  }

  ngOnDestroy(): void {
    this.route.navigate(['../'], { relativeTo: this.activateRoute })
  }

  getUpcomingTaskDetails() {

    if(this.userid != undefined && this.userid != null) {
      this.apiService.getUpcomingTaskDetails(this.userid).subscribe({
        
        next: (data: any) => {
          console.log("upcoming data:", data.result);
          this.response = data.result;
          // let count = 0;
          // let todayArray = this.upcomingTaskForm.get('today') as FormArray;
          for(let today of this.response) {
            console.log("today:",today);
            for(let item of today) {
              console.log("today1:" , item);
            }
            
          }
        },
        error: (err: any) => {
          console.log("Err:", err);
        }
      });
    }else {
      console.log("userid is undefined");
      
      this.route.navigate(['/']);
    }
  }

}
