import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderComponent,
    RouterModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
