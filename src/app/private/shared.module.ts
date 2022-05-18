import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {TextTransformPipe} from "../services/text-transform.pipe"

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    TextTransformPipe
  ],
  exports: [
    HeaderComponent,
    TextTransformPipe
  ]
})
export class SharedModule {

}
