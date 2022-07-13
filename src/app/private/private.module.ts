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
import {ReactiveFormsModule} from "@angular/forms";
import {BreadcrumbService} from "../services/breadcrumb.service";
import {RacksIndexComponent} from "./racks/index/racks-index.component";
import {RacksService} from "../services/racks.service";
import {RackShowComponent} from "./racks/show/rack-show.component"
import {RacksNewComponent} from "./racks/new/racks-new.component";
import {RacksFormComponent} from "./racks/form/racks-form.component";
import {RacksEditComponent} from "./racks/edit/racks-edit.component";
import {PatchpanelsModule} from "./patchpanels/patchpanels.module";
import {PatchpanelsService} from "../services/patchpanels.service";
import {SharedModule} from "./shared.module";
import {DevicesModule} from "./devices/devices.module";
import {DevicesService} from "../services/devices.service";
import { PatchcordsModule } from "./patchcords/patchcords.module";
import { PatchcordsService } from "../services/patchcords.service";
import { CablesModule } from "./cables/cables.module";
import { CablesService } from "../services/cables.service";
import { LogicalLinksModule } from "./logical-links/logical-links.module";
import { LogicalLinksService } from "../services/logical-links.service";
import { RoomsModule } from "./rooms/rooms.module";

@NgModule({
  declarations: [
    PrivateComponent,
    SidebarComponent,
    RoomsIndexComponent,
    RacksComponent,
    FooterComponent,
    RacksIndexComponent,
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
    RoomsModule,
    PatchpanelsModule,
    SharedModule,
    DevicesModule,
    PatchcordsModule,
    CablesModule,
    LogicalLinksModule
  ],
  exports: [
    PrivateComponent,
    SidebarComponent,
    RoomsIndexComponent,
    RacksComponent,
    FooterComponent,
    RacksIndexComponent,
    RackShowComponent,
    RacksNewComponent,
    RacksFormComponent,
    RacksEditComponent
  ],
  providers: [
    RoomsService,
    BreadcrumbService,
    RacksService,
    PatchpanelsService,
    DevicesService,
    PatchcordsService,
    CablesService,
    LogicalLinksService
  ]
})
export class PrivateModule {

}
