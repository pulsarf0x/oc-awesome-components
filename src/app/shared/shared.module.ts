import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe
  ]
})
export class SharedModule { }

