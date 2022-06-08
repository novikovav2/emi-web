import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { PatchcordsIndexComponent } from "./index/patchcords-index.component";
import { PatchcordsComponent } from "./patchcords.component";

@NgModule({
    declarations: [
        PatchcordsComponent,
        PatchcordsIndexComponent
    ],
    exports: [
        PatchcordsComponent,
        PatchcordsIndexComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        SharedModule
    ]
})
export class PatchcordsModule {

}