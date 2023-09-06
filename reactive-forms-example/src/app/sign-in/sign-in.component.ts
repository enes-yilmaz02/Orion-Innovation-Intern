import { AuthService } from './../auth.service';
import { AuthGuard } from './../auth.guards';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loginForm!: FormGroup; // Giriş formu
  public submittedLogin = false; // Giriş formu için submitted

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private authguard: AuthGuard, private authService: AuthService) { }

  ngOnInit(): void {
    // Giriş Formu için form grup oluşturuyor
    this.loginForm = this.fb.group({
      loginEmail: ['',[Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),],],
      loginPassword: ['', Validators.required],
    });
  }
    //FormGroup içindeki form denetimlerine erişmek için kullanılır.
    get formControl() {
      return this.loginForm.controls;
    }
    //adlı bir servisi kullanarak kullanıcı oturum açma işlemini tetikliyor
    login() {
      this.authService.login();
    }

  // Giriş Formu için onSubmit fonksiyonu
  onSubmitLogin() {
    this.submittedLogin = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // JSON sunucusundan kullanıcıları kontrol et
      this.http.get<any[]>('http://localhost:3000/users').subscribe(
        (users) => {
          const foundUser = users.find(
            (user) =>
              user.email === formData.loginEmail &&
              user.password === formData.loginPassword
          );
          if (foundUser) {
            console.log('Kullanıcı bulundu:', foundUser);
            //this.authguard.canActivate(); // Erişim izni kontrolü
            this.router.navigate(['/home']); // home rotasına yönlendirir
          } else {
            alert(
              'Kullanıcı bulunamadı.Lütfen bilgilenizi kontrol ediniz...'
            );
          }
        },
        (error) => {
          console.error('Kullanıcıları getirirken bir hata oluştu:', error);
        }
      );
    }
  }


}
