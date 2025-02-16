import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {HighlightDirective} from "./directives/highlight.directive";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    HighlightDirective
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    HighlightDirective
  ]
})
export class SharedModule { }

