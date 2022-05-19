import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared.module";
import {DevicesComponent} from "./devices.component";
import {DevicesIndexComponent} from "./index/devices-index.component";

@NgModule({
  declarations: [
    DevicesComponent,
    DevicesIndexComponent
  ],
  exports: [
    DevicesComponent,
    DevicesIndexComponent
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
