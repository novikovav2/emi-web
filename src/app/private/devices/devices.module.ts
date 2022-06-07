import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared.module";
import {DevicesComponent} from "./devices.component";
import {DevicesIndexComponent} from "./index/devices-index.component";
import {DevicesNewComponent} from "./new/devices-new.component"
import {DevicesFormComponent} from "./form/devices-form.component";
import {DevicesShowComponent} from "./show/devices-show.component"
import { DevicesEditComponent } from "./edit/devices-edit.component";
import { DevicesInterfacesComponent } from "./show/interfaces/devices-interfaces.component";

@NgModule({
  declarations: [
    DevicesComponent,
    DevicesIndexComponent,
    DevicesNewComponent,
    DevicesFormComponent,
    DevicesShowComponent,
    DevicesEditComponent,
    DevicesInterfacesComponent
  ],
  exports: [
    DevicesComponent,
    DevicesIndexComponent,
    DevicesNewComponent,
    DevicesFormComponent,
    DevicesShowComponent,
    DevicesEditComponent,
    DevicesInterfacesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class DevicesModule {

}
