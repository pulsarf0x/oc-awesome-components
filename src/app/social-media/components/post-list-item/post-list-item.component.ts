import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {Post} from "../../models/post.model";
import {SocialMediaModule} from "../../social-media.module";
import {SharedModule} from "../../../shared/shared.module";
import {CommentsComponent} from "../../../shared/components/comments/comments.component";
import {UsernamePipe} from "../../../shared/pipes/username.pipe";
import {TimeAgoPipe} from "../../../shared/pipes/time-ago.pipe";

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    NgOptimizedImage,
    NgIf,
    SharedModule,
    CommentsComponent,
    UsernamePipe,
    TimeAgoPipe
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {
  @Input() post!: Post
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>()


  tempUser = { firstname: 'Pascal', lastname: 'Prugna'}

  onNewComment(comment: string) {
    this.postCommented.emit({ comment: comment, postId: this.post.id})
  }
}
