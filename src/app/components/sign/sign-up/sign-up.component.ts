import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-sign-up',
   standalone: true,
   imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule, CommonModule],
   templateUrl: './sign-up.component.html',
   styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
   msg: any;
   showMsg: any
   constructor(private dataService: DataService, private route: Router) { }

   // signup(signuForm : NgForm) {
   signup(firstName: any, lastName: any, userEmail: any, userPassword: any) {

      // const islogin = this.dataService.signup({ signuForm.value.firstName, signuForm.value.lastName, signuForm.value.userEmail, signuForm.value.userPassword })
      const islogin = this.dataService.signup({ firstName, lastName, userEmail, userPassword })
         .subscribe(
            {
               next: (data: any) => {
                  console.log("signup:", data);
                  if (data.success == 1) {
                     this.route.navigate(['/login'])
                  } else {
                     this.msg = data.msg;
                     console.log("msg:", this.msg);
                     this.showHeader();
                     console.log("not navigated to login page");
                  }
               },
               error: (err: any) => {
                  console.log(err);

               }
            }
         )
   }

   showHeader() {
      this.showMsg = true;
      setTimeout(() => {
         this.showMsg = false;
      }, 8000)
   }

}
