import {Component, Input} from '@angular/core';
import {TitleCasePipe} from "@angular/common";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {
  @Input() post!: Post
}
