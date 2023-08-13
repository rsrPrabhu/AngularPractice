import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostDetailComponent } from "./post-detail.component";
import { ActivatedRoute } from "@angular/router";
import { PostsService } from "src/app/services/Post/posts.service";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { Post } from "src/app/model/Post";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('PostDetailComponent', () => {
  // snapshot.paramMap.get('id')
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostsService>;
  let dummyRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          return 3;
        }
      }
    }
  }

  beforeEach(() => {
    let mockActivatedRoute = dummyRoute;
    let mockPostService = jasmine.createSpyObj(['getSinglPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['goBack']);

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports : [FormsModule],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostsService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(PostDetailComponent);
  });


  xit('should check the post is Binded in H2 tag', () => {
    mockPostService.getSinglPost.and.returnValue(of({ id: 3, title: 'title 3', body: 'body content 3' } as Post));
       fixture.detectChanges();

      //  const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
       const element = fixture.nativeElement.querySelector('h2') as HTMLElement;
       expect(element.textContent).toBe(fixture.componentInstance.post?.title as string);
  });
});
