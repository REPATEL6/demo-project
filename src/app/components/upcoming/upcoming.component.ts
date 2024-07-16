import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnDestroy {

  constructor(public apiService : CallApiService, private activateRoute:ActivatedRoute, private route: Router, private dataService:DataService) {}

  btnOFF() {
    // this.apiService.setBtnToogle(true);
    // this.dataService.onButtonClickUpcoming.next(undefined);
  }

  ngOnDestroy(): void {
    this.route.navigate(['../'], {relativeTo:this.activateRoute})
  }

}
