import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CallApiService } from '../../../services/call-api.service';

@Component({
   selector: 'app-sign-up',
   standalone: true,
   imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule, ReactiveFormsModule],
   templateUrl: './sign-up.component.html',
   styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
   msg: any;
   showMsg: any
   signupForm!:FormGroup;
   constructor(private apiService: CallApiService, private route: Router, private fb:FormBuilder) { }

   ngOnInit() {
      this.signupForm = this.fb.group({
         firstName:[],
         lastName:[],
         userEmail:[],
         userPassword:[]
      })
   }

   signup(formData:FormGroup) {
      console.log("data:",formData.value);
      
      const islogin = this.apiService.signup(this.signupForm.value)
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
                     this.signupForm.reset();
                  }
               },
               error: (err: any) => {
                  console.log(err);

               }
            }
         )
   }

   // signup(firstName: any, lastName: any, userEmail: any, userPassword: any) {

   //   const islogin = this.apiService.signup({ firstName, lastName, userEmail, userPassword })
   //       .subscribe(
   //          {
   //             next: (data: any) => {
   //                console.log("signup:", data);
   //                if (data.success == 1) {
   //                   this.route.navigate(['/login'])
   //                } else {
   //                   this.msg = data.msg;
   //                   console.log("msg:", this.msg);
   //                   this.showHeader();
   //                   console.log("not navigated to login page");
   //                }
   //             },
   //             error: (err: any) => {
   //                console.log(err);

   //             }
   //          }
   //       )
   // }

   showHeader() {
      this.showMsg = true;
      setTimeout(() => {
         this.showMsg = false;
      }, 8000)
   }

}
