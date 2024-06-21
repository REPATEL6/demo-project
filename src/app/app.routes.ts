import { Routes } from '@angular/router';
import { TodayComponent } from './components/today/today.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { AddnewtaskComponent } from './components/addnewtask/addnewtask.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './components/sign/login/login.component';
import { SignUpComponent } from './components/sign/sign-up/sign-up.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'today', component: TodayComponent,
    children: [
      { path: 'addnewtask', component: AddnewtaskComponent }
    ]
  },

  {
    path: 'upcoming', component: UpcomingComponent,
    children: [
      { path: 'addnewtask', component: AddnewtaskComponent }
    ]
  },

  { path: '', component: TaskbarComponent, canActivate:[authGuard] },
  { path: '**', component: TaskbarComponent }

];
