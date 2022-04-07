import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PublicComponent} from "./public.component";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    PublicComponent,
    LoginComponent
  ]
})
export class PublicModule {

}
