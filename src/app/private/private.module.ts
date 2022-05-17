import {NgModule} from "@angular/core";
import {PrivateComponent} from "./private.component";
import {CommonModule} from "@angular/common";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RoomsIndexComponent} from "./rooms/index/rooms-index.component";
import {RacksComponent} from "./racks/racks.component";
import {FooterComponent} from "./footer/footer.component";
import {RoomsService} from "../services/rooms.service";
import {RoomItemComponent} from "./rooms/index/room/room-item.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {RoomsNewComponent} from "./rooms/new/rooms-new.component";
import {RoomsFormComponent} from "./rooms/form/rooms-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RoomsEditComponent} from "./rooms/edit/rooms-edit.component";
import {RoomsShowComponent} from "./rooms/show/rooms-show.component";
import {BreadcrumbService} from "../services/breadcrumb.service";
import {RacksIndexComponent} from "./racks/index/racks-index.component";
import {RacksService} from "../services/racks.service";
import {RoomRackItemComponent} from "./rooms/show/rack/room-rack-item.component";
import {RackShowComponent} from "./racks/show/rack-show.component"
import {RacksNewComponent} from "./racks/new/racks-new.component";
import {RacksFormComponent} from "./racks/form/racks-form.component";
import {RacksEditComponent} from "./racks/edit/racks-edit.component";
import {PatchpanelsModule} from "./patchpanels/patchpanels.module";
import {PatchpanelsService} from "../services/patchpanels.service";
import {SharedModule} from "./shared.module";

@NgModule({
  declarations: [
    PrivateComponent,
    SidebarComponent,
    RoomsIndexComponent,
    RacksComponent,
    FooterComponent,
    RoomsComponent,
    RoomItemComponent,
    RoomsNewComponent,
    RoomsFormComponent,
    RoomsEditComponent,
    RoomsShowComponent,
    RacksIndexComponent,
    RoomRackItemComponent,
    RackShowComponent,
    RacksNewComponent,
    RacksFormComponent,
    RacksEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PatchpanelsModule,
    SharedModule
  ],
  exports: [
    PrivateComponent,
    SidebarComponent,
    RoomsIndexComponent,
    RacksComponent,
    FooterComponent,
    RoomsComponent,
    RoomItemComponent,
    RoomsNewComponent,
    RoomsFormComponent,
    RoomsEditComponent,
    RoomsShowComponent,
    RacksIndexComponent,
    RoomRackItemComponent,
    RackShowComponent,
    RacksNewComponent,
    RacksFormComponent,
    RacksEditComponent
  ],
  providers: [
    RoomsService,
    BreadcrumbService,
    RacksService,
    PatchpanelsService
  ]
})
export class PrivateModule {

}
