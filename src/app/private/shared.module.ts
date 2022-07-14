import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {TextTransformPipe} from "../services/text-transform.pipe"
import { CardComponent } from "./shared/card/card.component";
import { MaterialModule } from "./material.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    TextTransformPipe,
    CardComponent
  ],
  exports: [
    HeaderComponent,
    TextTransformPipe,
    CardComponent,
    MaterialModule,
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {

}
