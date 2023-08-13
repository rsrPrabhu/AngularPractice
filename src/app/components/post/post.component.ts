import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post !: Post ;
  @Output() deletePost = new EventEmitter<Post>()

  constructor() { }

  ngOnInit(): void {
  }

  onDeletePost() {
    this.deletePost.emit(this.post);
  }

}
