import {NgModule} from "@angular/core";
import {PatchpanelsComponent} from "./patchpanels.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PatchpanelsIndexComponent} from "./index/patchpanels-index.component";
import {SharedModule} from "../shared.module";

@NgModule({
  declarations: [
    PatchpanelsComponent,
    PatchpanelsIndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    PatchpanelsComponent,
    PatchpanelsIndexComponent
  ]
})
export class PatchpanelsModule { }
