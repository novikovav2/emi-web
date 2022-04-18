import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicComponent} from "./public/public.component";
import {PrivateComponent} from "./private/private.component";
import {LoginComponent} from "./public/login/login.component";
import {AUTH_LOGIN_PAGE, AUTH_PAGE, EDIT, LOGIN_PAGE, NEW, PRIVATE_PAGE, RACKS, ROOMS} from "./consts";
import {AuthGuard} from "./services/auth.guard";
import {RoomsIndexComponent} from "./private/rooms/index/rooms-index.component";
import {RacksComponent} from "./private/racks/racks.component";
import {RoomsNewComponent} from "./private/rooms/new/rooms-new.component";
import {RoomsEditComponent} from "./private/rooms/edit/rooms-edit.component";
import {RoomsShowComponent} from "./private/rooms/show/rooms-show.component";

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
      { path: ROOMS,
        children: [
          { path: '', component: RoomsIndexComponent },
          { path: NEW, component: RoomsNewComponent },
          { path: EDIT + '/:id', component: RoomsEditComponent },
          { path: ':id', component: RoomsShowComponent}
        ]
      },
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
