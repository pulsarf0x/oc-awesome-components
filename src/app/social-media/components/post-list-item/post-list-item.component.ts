import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {Post} from "../../models/post.model";
import {SocialMediaModule} from "../../social-media.module";
import {SharedModule} from "../../../shared/shared.module";
import {CommentsComponent} from "../../../shared/components/comments/comments.component";

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    NgOptimizedImage,
    NgIf,
    SharedModule,
    CommentsComponent
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {
  @Input() post!: Post
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>()

  onNewComment(comment: string) {
    this.postCommented.emit({ comment: comment, postId: this.post.id})
  }
}
