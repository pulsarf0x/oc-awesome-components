import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderComponent,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
