import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { TodayComponent } from './components/today/today.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { AddnewtaskComponent } from './components/addnewtask/addnewtask.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskbarComponent, TodayComponent, UpcomingComponent,AddnewtaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  title = 'DemoProject2';
}
