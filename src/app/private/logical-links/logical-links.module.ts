import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { LogicalLinksIndexComponent } from "./index/logical-links-index.component";
import { LogicalLinksComponent } from "./logical-links.component";
import { LogicalLinksNewComponent } from "./new/logical-links-new.component";

@NgModule({
    declarations: [
        LogicalLinksComponent,
        LogicalLinksIndexComponent,
        LogicalLinksNewComponent
    ],
    exports: [
        LogicalLinksComponent,
        LogicalLinksIndexComponent,
        LogicalLinksNewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        SharedModule
    ]
})
export class LogicalLinksModule {

}