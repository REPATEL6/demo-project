import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CallApiService } from '../../services/call-api.service';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent {

  constructor(public apiService : CallApiService) {}

  btnON() {
    this.apiService.setBtnToogle(true);
  }

}
