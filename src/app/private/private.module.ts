import {NgModule} from "@angular/core";
import {PrivateComponent} from "./private.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrivateComponent
  ]
})
export class PrivateModule {

}
