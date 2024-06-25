import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  
  constructor(private route:Router) {}
  
  ngOnInit() {
    console.log("signin page")
    this.route.navigate(['/login'])
  }
  // signin(userEmail:any, userPassword:any) {

  //   let resp:any = this.dataService.signin({userEmail,userPassword});
  //   console.log("Response");
  //   this.result = resp;
    
  //   console.log("resp",resp);
    
  //   this.route.navigate(['/']);
  // }
}
