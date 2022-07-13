import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared.module";
import { RoomsEditComponent } from "./edit/rooms-edit.component";
import { RoomsFormComponent } from "./form/rooms-form.component";
import { RoomItemComponent } from "./index/room/room-item.component";
import { RoomsNewComponent } from "./new/rooms-new.component";
import { RoomsComponent } from "./rooms.component";
import { RoomRackItemComponent } from "./show/rack/room-rack-item.component";
import { RoomsShowComponent } from "./show/rooms-show.component";

@NgModule({
    declarations: [
        RoomsComponent,
        RoomItemComponent,
        RoomsNewComponent,
        RoomsFormComponent,
        RoomsEditComponent,
        RoomsShowComponent,
        RoomRackItemComponent
    ],
    exports: [
        RoomsComponent,
        RoomItemComponent,
        RoomsNewComponent,
        RoomsFormComponent,
        RoomsEditComponent,
        RoomsShowComponent,
        RoomRackItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        SharedModule
    ]
})
export class RoomsModule {

}