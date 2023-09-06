import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private isAuthenticated: boolean = false;
   test=new BehaviorSubject<boolean>(true);
  constructor(private router:Router) {}

  public isAuth(): boolean {
    return this.isAuthenticated ;
  }

  public login() {
    this.isAuthenticated = true;
  }

  public logout() {
    debugger
      this.test.subscribe((res:boolean)=>{
        if(res === false){
          this.router.navigate(['sign-in']);
        }
      })

  }
}
