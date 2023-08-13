import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { PostsService } from 'src/app/services/Post/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postList: Post[] = [];

  constructor(private _postsService: PostsService) { }

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    this._postsService.getPosts().subscribe(res => {
      this.postList = res;
    })
  }

  deletePost(post: Post) {
    this._postsService.deletePosts(post.id).subscribe();
  }

}
