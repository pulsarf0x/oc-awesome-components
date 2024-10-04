import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import {PostsService} from "./services/posts.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostsService
  ]
})
export class SocialMediaModule { }
