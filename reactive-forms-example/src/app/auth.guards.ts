import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // AuthService'i içeri aktarın

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    // Kullanıcının oturum açıp açmadığını AuthService kullanarak kontrol ediyor
     if (this.authService.isAuth()) {
      return true; // Kullanıcı oturum açmışsa true döndürüyor
    } else {
      // Kullanıcı oturum açmamışsa giriş yapma sayfasına yönlendiriyor
      this.router.navigate(['sign-in']);
      return false;
    }
  }
}
