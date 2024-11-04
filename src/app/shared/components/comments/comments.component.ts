import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../core/models/comment.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../shared.module";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TimeAgoPipe} from "../../pipes/time-ago.pipe";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    SharedModule,
    NgIf,
    TimeAgoPipe
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        backgroundColor: 'white',
        zIndex: 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        backgroundColor: 'rgb(201, 157, 242)',
        zIndex: 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit{
  @Input() comments!: Comment[]
  @Output() newComment = new EventEmitter<string>()

  commentCtrl!: FormControl
  animationStates: { [key: number]: 'default' | 'active' } = {}
  listItemAnimationState: 'default' | 'active' = 'default';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)])

    for (let index in this.comments) {
      this.animationStates[index] = 'default'
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return
    }

    this.newComment.emit(this.commentCtrl.value)
    this.commentCtrl.reset()
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active'
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default'
  }
}
