import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicComponent} from "./public/public.component";
import {PrivateComponent} from "./private/private.component";
import {LoginComponent} from "./public/login/login.component";
import {AUTH_PAGE, LOGIN_PAGE, PRIVATE_PAGE} from "./consts";

const routes: Routes = [
  { path: AUTH_PAGE,
    component: PublicComponent,
    children: [
      { path: LOGIN_PAGE, component: LoginComponent }
    ]
  },
  { path: PRIVATE_PAGE, component: PrivateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
