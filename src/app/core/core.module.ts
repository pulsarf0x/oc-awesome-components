import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    HeaderComponent,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
