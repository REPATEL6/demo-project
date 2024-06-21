import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { task } from '../../../models/taskDetails'

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent implements OnInit {
  userid: number | undefined;
  response?:any[];

  constructor(public dataService:DataService, private route:Router) {
    if(sessionStorage.getItem("id") !== undefined){
      this.userid = +sessionStorage.getItem("id")!;
    }else{
      sessionStorage.setItem("isLoggedIn","false");
      route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.getTasks();
  }

  btnON() {
    this.dataService.setBtnToogle(true);
  }

  getTasks() {
    if(this.userid !== undefined){
      this.dataService.getTaskDetails(this.userid).subscribe((data:any) => {
        console.log("gettask data",data.result[0]);
        console.log("gettask data",typeof data.result[0]);
        this.response = data.result;
      })
    }
  }

}
