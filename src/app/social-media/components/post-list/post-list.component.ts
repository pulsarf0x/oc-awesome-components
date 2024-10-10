import {Component, OnInit} from '@angular/core';
import {PostListItemComponent} from "../post-list-item/post-list-item.component";
import {map, Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostListItemComponent,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
  }

  ngOnInit() {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    )
  }

  onPostCommented(postCommented: { comment: string, postId: number }) {
    this.postService.addNewComment(postCommented)
  }
}
