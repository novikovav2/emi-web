import {NgModule} from "@angular/core";
import {PrivateComponent} from "./private.component";
import {CommonModule} from "@angular/common";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RoomsComponent} from "./rooms/rooms.component";
import {RacksComponent} from "./racks/racks.component";

@NgModule({
  declarations: [
    PrivateComponent,
    SidebarComponent,
    RoomsComponent,
    RacksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    PrivateComponent,
    SidebarComponent,
    RoomsComponent,
    RacksComponent
  ]
})
export class PrivateModule {

}
