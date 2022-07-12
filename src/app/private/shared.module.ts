import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {TextTransformPipe} from "../services/text-transform.pipe"
import { CardComponent } from "./shared/card/card.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    TextTransformPipe,
    CardComponent
  ],
  exports: [
    HeaderComponent,
    TextTransformPipe,
    CardComponent
  ]
})
export class SharedModule {

}
