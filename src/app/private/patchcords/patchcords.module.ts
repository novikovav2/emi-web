import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { PatchcordsIndexComponent } from "./index/patchcords-index.component";
import { PatchcordsNewComponent } from "./new/patchcords-new.component";
import { PatchcordsComponent } from "./patchcords.component";
import { PatchcordsShowComponent } from "./show/patchcords-show.component";

@NgModule({
    declarations: [
        PatchcordsComponent,
        PatchcordsIndexComponent,
        PatchcordsNewComponent,
        PatchcordsShowComponent
    ],
    exports: [
        PatchcordsComponent,
        PatchcordsIndexComponent,
        PatchcordsNewComponent,
        PatchcordsShowComponent
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