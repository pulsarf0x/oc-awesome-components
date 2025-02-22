import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import {PostsService} from "./services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    PostsService
  ]
})
export class SocialMediaModule { }
