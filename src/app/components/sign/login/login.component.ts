import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-login',
   standalone: true,
   imports: [RouterLink, RouterLinkActive, CommonModule],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css'
})

export class LoginComponent {

   public response: any;
   public showhead: any = null;

   constructor(private dataService: DataService, private route: Router) { }

   signin(userEmail: any, userPassword: any) {

      this.dataService.signin({ userEmail, userPassword }).subscribe(
         {
            next: (resp: any) => {
               console.warn("resp", resp);
               this.response = resp.success;
               console.warn("result", this.response!);
               if (this.response == '1') {
                  console.log("islogin")
                  console.log(typeof resp.result.user_id);

                  sessionStorage.setItem("isLoggedIn", "true");
                  sessionStorage.setItem("id", resp.result.user_id.toString());
                  this.route.navigate(['/']);
               } else {
                  console.log("isnotlogin")
                  sessionStorage.setItem("isLoggedIn", "false");
                  this.showHeader();
                  //   }
               }
            },
            error: (err: any) => {
               console.log(err);

            }
         }
         //   (resp: any) => {
         //   console.warn("resp", resp);
         //   this.response = resp.success;
         //   console.warn("result", this.response!);
         //   if (this.response == '1') {
         //     console.log("islogin")
         //     console.log(typeof resp.result.user_id);

         //     sessionStorage.setItem("isLoggedIn", "true");
         //     sessionStorage.setItem("id",resp.result.user_id.toString());
         //     this.route.navigate(['/']);
         //   } else {
         //     console.log("isnotlogin")
         //     sessionStorage.setItem("isLoggedIn", "false");
         //   }
         // }
      )
   }

   showHeader() {
      this.showhead = true;
      setTimeout(() => {
         this.showhead = false;
      },5000)
   }
}