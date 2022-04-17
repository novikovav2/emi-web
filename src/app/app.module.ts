import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PublicModule} from "./public/public.module";
import {PrivateModule} from "./private/private.module";
import {ReactiveFormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {Interceptors} from "./services/interceptors";
import {AuthGuard} from "./services/auth.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    PrivateModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    Interceptors,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
