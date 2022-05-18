import {NgModule} from "@angular/core";
import {PatchpanelsComponent} from "./patchpanels.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PatchpanelsIndexComponent} from "./index/patchpanels-index.component";
import {SharedModule} from "../shared.module";
import {PatchpanelsNewComponent} from "./new/patchpanels-new.component";
import {PatchpanelsFormComponent} from "./form/patchpanels-form.component";
import {PatchpanelsShowComponent} from "./show/patchpanels-show.component";
import {PatchpanelsEditComponent} from "./edit/patchpanels-edit.component";
import {PatchpanelsInterfacesComponent} from "./show/interfaces/patchpanels-interfaces.component";

@NgModule({
  declarations: [
    PatchpanelsComponent,
    PatchpanelsIndexComponent,
    PatchpanelsNewComponent,
    PatchpanelsFormComponent,
    PatchpanelsShowComponent,
    PatchpanelsEditComponent,
    PatchpanelsInterfacesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    PatchpanelsComponent,
    PatchpanelsIndexComponent,
    PatchpanelsNewComponent,
    PatchpanelsFormComponent,
    PatchpanelsShowComponent,
    PatchpanelsEditComponent,
    PatchpanelsInterfacesComponent
  ]
})
export class PatchpanelsModule { }
