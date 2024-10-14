import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../core/models/comment.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../shared.module";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TimeAgoPipe} from "../../pipes/time-ago.pipe";

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
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{
  @Input() comments!: Comment[]
  @Output() newComment = new EventEmitter<string>()

  commentCtrl!: FormControl

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return
    }

    this.newComment.emit(this.commentCtrl.value)
    this.commentCtrl.reset()
  }
}
