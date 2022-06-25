import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { LogicalLinksIndexComponent } from "./index/logical-links-index.component";
import { LogicalLinksComponent } from "./logical-links.component";

@NgModule({
    declarations: [
        LogicalLinksComponent,
        LogicalLinksIndexComponent
    ],
    exports: [
        LogicalLinksComponent,
        LogicalLinksIndexComponent
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