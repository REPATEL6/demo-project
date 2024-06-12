import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent {

  constructor(public dataService:DataService) {}

  btnON() {
    this.dataService.setBtnToogle(true);
  }

}
