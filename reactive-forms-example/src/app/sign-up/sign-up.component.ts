import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registrationForm!: FormGroup;
  public submitted = false;
  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient ) {}
  ngOnInit(): void {
    // this.submitted = true;
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ["",[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      phone:  ["",[Validators.required]],
      password: ["",[Validators.required,Validators.pattern("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}")]]
    });
  }

  get formControl() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      // Form verilerini al
      const formData = this.registrationForm.value;

      // JSON-Server'a POST isteği gönder
      this.http.post('http://localhost:3000/users', formData).subscribe(
        response => {
          alert('Veri başarıyla JSON-Server\'a kaydedildi.');
          this.router.navigate(['sign-in']);
        },
        error => {
          console.error('Veriyi JSON-Server\'a kaydederken bir hata oluştu:', error);
        }
      );
    }
  }

  navigateSignin(){
    this.router.navigate(['/signup'])
  }

}

