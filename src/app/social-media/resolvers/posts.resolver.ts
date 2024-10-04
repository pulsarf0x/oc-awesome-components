import { ResolveFn } from '@angular/router';
import {Post} from "../models/post.model";
import {PostsService} from "../services/posts.service";
import {inject} from "@angular/core";
import {Observable} from "rxjs";

export const postsResolver: ResolveFn<Post[]> = (route, state): Observable<Post[]> => {
  const postService = inject(PostsService)

  return postService.getPosts();
};
