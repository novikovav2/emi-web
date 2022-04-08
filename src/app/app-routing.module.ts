import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicComponent} from "./public/public.component";
import {PrivateComponent} from "./private/private.component";
import {LoginComponent} from "./public/login/login.component";
import {AUTH_LOGIN_PAGE, AUTH_PAGE, LOGIN_PAGE, PRIVATE_PAGE, RACKS, ROOMS} from "./consts";
import {AuthGuard} from "./services/auth.guard";
import {RoomsComponent} from "./private/rooms/rooms.component";
import {RacksComponent} from "./private/racks/racks.component";

const routes: Routes = [
  { path: AUTH_PAGE,
    component: PublicComponent,
    children: [
      { path: LOGIN_PAGE, component: LoginComponent }
    ]
  },
  { path: PRIVATE_PAGE,
    component: PrivateComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    // pathMatch: 'full',
    children: [
      { path: ROOMS, component: RoomsComponent },
      { path: RACKS, component: RacksComponent }
    ]
  },
  { path: '**', redirectTo: AUTH_LOGIN_PAGE }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
