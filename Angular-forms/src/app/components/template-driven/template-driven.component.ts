import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent {

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Ad:', form.value.firstName);
      console.log('Soyad:', form.value.lastName);
      console.log('Telefon:', form.value.phone);
      console.log('E-Posta:', form.value.email);
    }
  }
}
