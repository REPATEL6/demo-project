import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent {

}
