import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../core/models/comment.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../shared.module";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TimeAgoPipe} from "../../pipes/time-ago.pipe";
import {
  animate,
  animateChild,
  group,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger, useAnimation
} from "@angular/animations";
import {flashAnimation} from "../../animations/flash.animations";
import {slideAndFadeAnimation} from "../../animations/slide-and-fade.animation";

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
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, [
            animateChild()
          ])
        ])
      ])
    ]),,
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
      ]),
      transition(':enter', [
        query('.comment-text, .comment-date', [
          style({
            opacity: 0
          })
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
            time: '500ms',
            startColor: 'rgb(201, 157, 242)'
          }
        }),
        group([
          useAnimation(flashAnimation, {
            params: {
              time: '250ms',
              flashColor: 'rgb(249,179,111)'
            }
          }),
          query('.comment-text', [
            animate('250ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('500ms', style({
              opacity: 1
            }))
          ]),
        ]),
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

    const maxId = Math.max(...this.comments.map(comment => comment.id))
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    })
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
