import {NgModule} from "@angular/core";
import {PrivateComponent} from "./private.component";
import {CommonModule} from "@angular/common";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    PrivateComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    PrivateComponent,
    SidebarComponent
  ]
})
export class PrivateModule {

}
