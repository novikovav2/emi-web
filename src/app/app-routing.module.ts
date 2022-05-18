import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicComponent} from "./public/public.component";
import {PrivateComponent} from "./private/private.component";
import {LoginComponent} from "./public/login/login.component";
import {
  AUTH_LOGIN_PAGE,
  AUTH_PAGE,
  EDIT,
  LOGIN_PAGE,
  NEW,
  PATCHPANELS,
  PRIVATE_PAGE,
  RACKS,
  ROOMS,
  ROOT
} from "./consts";
import {AuthGuard} from "./services/auth.guard";
import {RoomsIndexComponent} from "./private/rooms/index/rooms-index.component";
import {RoomsNewComponent} from "./private/rooms/new/rooms-new.component";
import {RoomsEditComponent} from "./private/rooms/edit/rooms-edit.component";
import {RoomsShowComponent} from "./private/rooms/show/rooms-show.component";
import {RacksIndexComponent} from "./private/racks/index/racks-index.component";
import {RackShowComponent} from "./private/racks/show/rack-show.component";
import {RacksNewComponent} from "./private/racks/new/racks-new.component";
import {RacksEditComponent} from "./private/racks/edit/racks-edit.component";
import {PatchpanelsIndexComponent} from "./private/patchpanels/index/patchpanels-index.component";
import {PatchpanelsNewComponent} from "./private/patchpanels/new/patchpanels-new.component";
import {PatchpanelsShowComponent} from "./private/patchpanels/show/patchpanels-show.component";
import {PatchpanelsEditComponent} from "./private/patchpanels/edit/patchpanels-edit.component";

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
          { path: ROOT, component: RoomsIndexComponent },
          { path: NEW, component: RoomsNewComponent },
          { path: EDIT + '/:id', component: RoomsEditComponent },
          { path: ':id', component: RoomsShowComponent}
        ]
      },
      { path: RACKS,
        children: [
          { path: ROOT, component: RacksIndexComponent },
          { path: NEW, component: RacksNewComponent },
          { path: EDIT + '/:id', component: RacksEditComponent },
          { path: ':id', component: RackShowComponent },
        ]
      },
      {
        path: PATCHPANELS,
        children: [
          { path: ROOT, component: PatchpanelsIndexComponent },
          { path: NEW, component: PatchpanelsNewComponent },
          { path: EDIT + '/:id', component: PatchpanelsEditComponent },
          { path: ':id', component: PatchpanelsShowComponent }
        ]
      }
    ]
  },
  { path: '**', redirectTo: AUTH_LOGIN_PAGE }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
