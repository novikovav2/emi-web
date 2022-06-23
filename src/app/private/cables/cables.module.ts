import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { CablesComponent } from "./cables.component";
import { CablesIndexComponent } from "./index/cables-index.component";

@NgModule({
    declarations: [
        CablesComponent,
        CablesIndexComponent
    ],
    exports: [
        CablesComponent,
        CablesIndexComponent
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