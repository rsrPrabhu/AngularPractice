import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { PostsService } from 'src/app/services/Post/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | any;
  constructor(private route: ActivatedRoute, private postService: PostsService,
    private location: Location) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.postService.getSinglPost(+id).subscribe(res => this.post = res);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.postService.updatePost(this.post as Post).subscribe(res => {
      this.goBack();
    });
  }

}
