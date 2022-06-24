import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { CablesComponent } from "./cables.component";
import { CablesIndexComponent } from "./index/cables-index.component";
import { CablesNewComponent } from "./new/cables-new.component";
import { CablesShowComponent } from "./show/cables-show.component";

@NgModule({
    declarations: [
        CablesComponent,
        CablesIndexComponent,
        CablesNewComponent,
        CablesShowComponent
    ],
    exports: [
        CablesComponent,
        CablesIndexComponent,
        CablesNewComponent,
        CablesShowComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        SharedModule
    ]
})
export class CablesModule {

}