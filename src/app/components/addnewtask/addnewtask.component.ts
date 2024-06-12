import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-addnewtask',
  standalone: true,
  imports: [],
  templateUrl: './addnewtask.component.html',
  styleUrl: './addnewtask.component.css'
})
export class AddnewtaskComponent {

  constructor(private dataService : DataService) {}

  btnOFF() {
    this.dataService.setBtnToogle(false);
  }

}
