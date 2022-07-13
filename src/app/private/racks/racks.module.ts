import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { RacksEditComponent } from "./edit/racks-edit.component";
import { RacksFormComponent } from "./form/racks-form.component";
import { RacksIndexComponent } from "./index/racks-index.component";
import { RacksNewComponent } from "./new/racks-new.component";
import { RacksComponent } from "./racks.component";
import { RackShowComponent } from "./show/rack-show.component";

@NgModule({
    declarations: [
        RacksComponent,
        RacksIndexComponent,
        RackShowComponent,
        RacksNewComponent,
        RacksFormComponent,
        RacksEditComponent
    ],
    exports: [
        RacksComponent,
        RacksIndexComponent,
        RackShowComponent,
        RacksNewComponent,
        RacksFormComponent,
        RacksEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        SharedModule
    ]
})
export class RacksModule {

}