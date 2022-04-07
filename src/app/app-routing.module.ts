import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicComponent} from "./public/public.component";
import {PrivateComponent} from "./private/private.component";
import {LoginComponent} from "./public/login/login.component";

const routes: Routes = [
  { path: 'auth',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'private', component: PrivateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
