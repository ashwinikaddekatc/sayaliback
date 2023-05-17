import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddguestComponent } from './addguest/addguest.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotresetpasswordComponent } from './forgotresetpassword/forgotresetpassword.component';
import { Forgotresetpassword1Component } from './forgotresetpassword1/forgotresetpassword1.component';

import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {path: 'forgotpass', component:ForgotpasswordComponent},
  {path:'forgotresetpassword/:id', component:ForgotresetpasswordComponent},
  {path:'adduser/:id', component:Forgotresetpassword1Component},
  {path:'addguest/:id', component:AddguestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
