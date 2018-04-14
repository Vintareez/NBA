import { Component, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 
  constructor(private router: Router){}

  color = 'primary';
  checked = false;
  disabled = false;
  ChangeToggle(){
    this.checked = !this.checked;
    if(this.checked){
      this.router.navigate(['teams']);
    }
    else{
      this.router.navigate(['']);
    }
  }
  openFavorite(){
    if(this.router.isActive('/favorite', true)){
      this.router.navigate(['']);
      this.checked=false;
    }
    else{
      this.router.navigate(['favorite']);
    }
  }
  toHome(){
    this.router.navigate(['']);
    this.checked = false;
  }
}

