import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getURL = 'https://jsonplaceholder.typicode.com/posts';
  deleteURL = 'https://jsonplaceholder.typicode.com/posts';

  getPosts() {
    return this.http.get<Post[]>(this.getURL);
  } 

  getSinglPost(id : number) {
    return this.http.get<Post>(this.getURL + '/' +  id);
  }

  updatePost(post : Post) {
    return this.http.put<Post>(this.getURL + '/' +  post.id , post);
  }
  
  deletePosts(_postId : number) {
    return this.http.delete(this.deleteURL + '/' + _postId);
  }


}
