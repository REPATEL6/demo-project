import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const route = inject(Router)
  console.log("Auth");

  let isLoggedin = sessionStorage.getItem("isLoggedIn");
  console.log(isLoggedin, "loggedin");
  if (typeof sessionStorage !== 'undefined') {
    console.log("Auth")

    return isLoggedin === 'true';
  }
  route.navigate(['/login']);
  return false;

};
