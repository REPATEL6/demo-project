import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  btnToggle?:boolean;

  getBtnToggle():boolean {
    return this.btnToggle!;
  }

  setBtnToogle(toggle_value:boolean) {
    this.btnToggle = toggle_value;
  }
}
