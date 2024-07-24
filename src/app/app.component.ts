import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { TodayComponent } from './components/today/today.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { AddnewtaskComponent } from './components/addnewtask/addnewtask.component';
import { SigninComponent } from './components/sign/signin.component';
import { SignUpComponent } from './components/sign/sign-up/sign-up.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskbarComponent, TodayComponent, UpcomingComponent, AddnewtaskComponent, SigninComponent, SignUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("Hiiiii")
  }

  isUserAuthenticated() {

    if(sessionStorage.getItem("isLoggedIn") == "true"){
      return true;
    }
    // else{
    //   return false;
    // }
    // throw new Error('Method not implemented.');
    // if (isPlatformBrowser(this.platformId)) {
    //   const isAuthenticated = sessionStorage.getItem('isLoggedIn');
    //   return isAuthenticated === 'true';
    // }
    return false; // Not in a browser environment
  }

  // ngOnDestroy(): void {
  //   sessionStorage.setItem('isLoggedIn','false');
  // }
}
