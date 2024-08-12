import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CallApiService } from '../../services/call-api.service';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent implements OnInit {

  todayTaskLength: number = 0;
  upcomingTaskLength: number = 0;
  userid = +sessionStorage.getItem("id")!;

  constructor(private route:Router, private dataService : DataService, private apiService : CallApiService) {}

  // ngAfterViewChecked(): void {
  //   this.todayTaskLength = this.dataService.getTodayTaskListLength();
  //   this.upcomingTaskLength = this.dataService.getUpcomingTaskListLength();
  // }

  getLengthByCallingApi() {
    if(this.userid!=undefined && this.userid!= null){
    this.apiService.getUpcomingTaskDetails(this.userid).subscribe({

      next: (data: any) => {
        this.upcomingTaskLength = data.result.at(0).length + data.result.at(1).length + data.result.at(2).length;
      },
      error(err : any) {
        console.log("ERROR: " ,err.message);
        
      },
    });

    this.apiService.getTaskDetails(this.userid).subscribe({

      next: (data:any) =>{
        this.todayTaskLength = data.result.length;
        console.log(this.todayTaskLength,"46564");
        
      },
      error(err:any) {
        console.log("ERROR: ", err.message);
        
      }
    })
  }else{
    console.log("session is expired");
    this.logout();
  }

  }

  ngOnInit(): void {
    this.getLengthByCallingApi();
    console.log("Called taskbar")
    this.route.navigate(['/today']);
  }

  logout() {
    console.log("Logout");
    sessionStorage.clear();
    this.route.navigate(['/']);
  }

}
