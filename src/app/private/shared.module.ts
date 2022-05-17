import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {MaterialPipe} from "../services/material.pipe"

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    MaterialPipe
  ],
  exports: [
    HeaderComponent,
    MaterialPipe
  ]
})
export class SharedModule {

}
