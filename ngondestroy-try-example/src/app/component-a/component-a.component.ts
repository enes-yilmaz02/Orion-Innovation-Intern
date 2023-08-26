import { Component } from '@angular/core';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.css']
})
export class ComponentAComponent {
  ngOnDestroy() {
    console.log("a den b ya geçilirken çalıştı");
   }
   //ngOnDestroy yöntemini, bir bileşenin ömrü sona erdiğinde çalışacak kodu içeren bir yer olarak düşünebilir
}
