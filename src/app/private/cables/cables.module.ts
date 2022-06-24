import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { CablesComponent } from "./cables.component";
import { CablesIndexComponent } from "./index/cables-index.component";
import { CablesNewComponent } from "./new/cables-new.component";

@NgModule({
    declarations: [
        CablesComponent,
        CablesIndexComponent,
        CablesNewComponent
    ],
    exports: [
        CablesComponent,
        CablesIndexComponent,
        CablesNewComponent
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