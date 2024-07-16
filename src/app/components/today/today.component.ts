import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { task } from '../../../models/taskDetails'
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallApiService } from '../../services/call-api.service';
import { DataService } from '../../services/data.service';
import { AddnewtaskComponent } from '../addnewtask/addnewtask.component';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule, AddnewtaskComponent, FormsModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  userid: number | undefined;
  response: any;

  @ViewChild(AddnewtaskComponent, { static: true }) addnewComp?: AddnewtaskComponent;

  dropdownOptions = [
    { id: 0, name: '-Select-' },
    { id: 1, name: 'work' },
    { id: 2, name: 'personal' },
    { id: 3, name: 'Option 3' }
  ];

  constructor(public apiService: CallApiService, private route: Router, private dataService: DataService, private activateRoute: ActivatedRoute, private fb: FormBuilder) {
    if (sessionStorage.getItem("id") !== undefined) {
      this.userid = +sessionStorage.getItem("id")!;
    } else {
      sessionStorage.setItem("isLoggedIn", "false");
      route.navigate(['/']);
    }
    // this.dataService.onButtonClickAddtoTod.subscribe((data:any) => {
    //   console.log("Helloooooooooooooooooooooooooooooooooo");
    //   this.getTasks();

    // })
  }

  ngOnInit(): void {
    this.getTasks();
    console.log("oninit");
  }

  ngAfterViewInit(): void {
    console.log("afterViewInit");
  }

  ngOnChanges(): void {
    console.log("on Changes");

  }

  ngOnDestroy(): void {
  }

  btnON() {
    console.log("btn clicked");
    this.dataService.storeData(undefined);
    this.dataService.onButtonClickTodtoAdd.next(undefined);
  }


  getTasks(): any {
    if (this.userid !== undefined) {
      this.apiService.getTaskDetails(this.userid).subscribe((data: any) => {
        console.log("gettask data", data.result);
        this.response = data.result;
      })
    }
  }

  sentData(val: any) {
    console.log("getdata:", val)
    this.dataService.storeData(val);
    this.dataService.onButtonClickTodtoAdd.next(val);
    this.route.navigate(['/today', 'addnewtask'], { skipLocationChange: true });
  }


}
