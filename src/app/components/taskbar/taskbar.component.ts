import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent implements OnInit {

  constructor(private dataService : DataService, private route:Router) {}

  ngOnInit(): void {
    // this.dataService.getData();
    console.log("Called taskbar")
    this.route.navigate(['/today']);
  }

  logout() {
    console.log("Logout");
    sessionStorage.clear();
    this.route.navigate(['/']);
  }

}
