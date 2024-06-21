import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { TodayComponent } from './components/today/today.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { AddnewtaskComponent } from './components/addnewtask/addnewtask.component';
import { SigninComponent } from './components/sign/signin.component';
import { SignUpComponent } from './components/sign/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskbarComponent, TodayComponent, UpcomingComponent,AddnewtaskComponent,SigninComponent,SignUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  
  constructor(private route:Router) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("Hiiiii")
  }
  
  isUserAuthenticated() {
    if(sessionStorage.getItem("isLoggedIn") == "true"){
      return true;
    }else{
      return false;
    }
  // throw new Error('Method not implemented.');
  }

  // ngOnDestroy(): void {
  //   sessionStorage.setItem('isLoggedIn','false');
  // }
}
