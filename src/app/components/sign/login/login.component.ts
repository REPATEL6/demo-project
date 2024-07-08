import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CallApiService } from '../../../services/call-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
   selector: 'app-login',
   standalone: true,
   imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css'
})

export class LoginComponent {

   public response: any;
   public showhead: any = null;
   signinForm!: FormGroup;
   
   constructor(private apiService: CallApiService, private route: Router, private fb: FormBuilder) { }

   ngOnInit() {
      this.signinForm = this.fb.group({
         userEmail:[''],
         userPassword:['']
      })
   }
   login(formData:FormGroup) {
      console.log(formData.value);
      this.apiService.signin(this.signinForm.value).subscribe(
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
                  this.signinForm.reset();
               }
            },
            error: (err: any) => {
               console.log(err);

            }
         }
      )
      
   }

   signin(userEmail: any, userPassword: any) {

      // this.apiService.signin(this.signinForm.value).subscribe(
      //    {
      //       next: (resp: any) => {
      //          console.warn("resp", resp);
      //          this.response = resp.success;
      //          console.warn("result", this.response!);
      //          if (this.response == '1') {
      //             console.log("islogin")
      //             console.log(typeof resp.result.user_id);

      //             sessionStorage.setItem("isLoggedIn", "true");
      //             sessionStorage.setItem("id", resp.result.user_id.toString());
      //             this.route.navigate(['/']);
      //          } else {
      //             console.log("isnotlogin")
      //             sessionStorage.setItem("isLoggedIn", "false");
      //             this.showHeader();
      //             //   }
      //          }
      //       },
      //       error: (err: any) => {
      //          console.log(err);

      //       }
      //    }
      // )
   }

   showHeader() {
      this.showhead = true;
      setTimeout(() => {
         this.showhead = false;
      },6000)
   }
}
