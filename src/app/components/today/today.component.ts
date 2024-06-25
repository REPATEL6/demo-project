import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet , ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { task } from '../../../models/taskDetails'
import { FormsModule } from '@angular/forms';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';

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

  constructor(public apiService:CallApiService, private route:Router, private dataService: DataService, private activatedRoute:ActivatedRoute ) {
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
    this.apiService.setBtnToogle(true);
  }

  getTasks() {
    if(this.userid !== undefined){
      this.apiService.getTaskDetails(this.userid).subscribe((data:any) => {
        console.log("gettask data",data.result);
        console.log("gettask data",typeof data.result);
        this.response = data.result;
      })
    }
  }

  getData(val: any) {
    console.log("getdata:", val)
    this.dataService.storeData(val);
    this.btnON();
    this.route.navigate(['/today','addnewtask']);
  }
  

}
