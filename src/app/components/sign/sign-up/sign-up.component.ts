import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
   signupForm!: FormGroup;
   constructor(private apiService: CallApiService, private route: Router, private fb: FormBuilder) { }

   ngOnInit() {
      this.signupForm = this.fb.group({
         firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
         lastName: ['', [Validators.minLength(4), Validators.maxLength(10)]],
         userEmail: ['', [Validators.required, Validators.email]],
         userPassword: ['', [Validators.required, Validators.minLength(8)]]
      });
   }

   signup(formData: FormGroup) {
      console.log("data:", this.signupForm.value);
      console.log(this.signupForm.valid)

      if (!this.signupForm.valid) {
         if (!this.signupForm.controls['firstName'].touched) {
            this.msg = "First Name is mandatory";
         } else if (!this.signupForm.controls['firstName'].valid) {
            this.msg = "First Name must have min 2 character and max 10 characters";
         } else if (this.signupForm.controls['lastName'].touched && !this.signupForm.controls['lastName'].valid) {
            this.msg = "Last Name must have min 4 character and max 10 characters";
         } else if (!this.signupForm.controls['userEmail'].touched) {
            this.msg = "Email ID is mandatory";
         } else if (!this.signupForm.controls['userEmail'].valid) {
            this.msg = "Invalid email";
         } else if (!this.signupForm.controls['userPassword'].touched) {
            this.msg = "Password is mandatory";
         } else if (!this.signupForm.controls['userPassword'].valid) {
            this.msg = "Password must have min 8 characters";
         }
         console.log("invalid");

         this.showHeader();
      } else {
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
      }, 10000)
   }

}
