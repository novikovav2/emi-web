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

@NgModule({
  declarations: [
    DevicesComponent,
    DevicesIndexComponent,
    DevicesNewComponent,
    DevicesFormComponent,
    DevicesShowComponent
  ],
  exports: [
    DevicesComponent,
    DevicesIndexComponent,
    DevicesNewComponent,
    DevicesFormComponent,
    DevicesShowComponent
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
