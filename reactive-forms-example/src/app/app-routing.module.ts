import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './auth.guards';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },

  { path: 'home', component: HomeComponent , canActivate:[AuthGuard]},

  { path: 'sign-up', component: SignUpComponent },

  { path: '**', redirectTo: 'sign-in' }//bilinmeyen bir URL ile karşılaşıldığında, bu URL 'sign-in' rotasına yeniden yönlendirilir.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
