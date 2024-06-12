import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent {

  constructor(public dataService : DataService) {}

  btnON() {
    this.dataService.setBtnToogle(true);
  }

}
