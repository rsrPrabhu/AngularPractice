import { Post } from "src/app/model/Post";
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostsService } from "src/app/services/Post/posts.service";
import { Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { By } from "@angular/platform-browser";
import { PostComponent } from "../post/post.component";

class mockPostsServiceCurrent {
    getPosts() { }
    deletePosts(_postId: number) {
        return of(true);
    }
}

describe('PostsComponent', () => {

    @Component({
        selector: 'app-posts',
        template: '<div></div>',
    })


    class FakePostcomponent {
        @Input() post !: Post;
    }

    let postList: Post[];
    let mockPostService: any;
    // let postService: any;
    let postComponent: PostsComponent;
    let postComponentChild: PostsComponent;

    let fixture: ComponentFixture<PostsComponent>;

    // beforeEach(() => {
    //     postList = [
    //         { id: 1, title: 'title 1', body: 'body content 1' },
    //         { id: 2, title: 'title 2', body: 'body content 2' },
    //         { id: 3, title: 'title 3', body: 'body content 3' },
    //     ];
    //     mockPostService = jasmine.createSpyObj(['getPosts', 'deletePosts']);
    //     postComponent = new PostsComponent(mockPostService);
    // });

    beforeEach(() => {
        postList = [
            { id: 1, title: 'title 1', body: 'body content 1' },
            { id: 2, title: 'title 2', body: 'body content 2' },
            { id: 3, title: 'title 3', body: 'body content 3' },
        ];

        // test be syntax
        // TestBed.configureTestingModule({
        //     declarations : [PostsComponent]
        // });
        // const fixture  = TestBed.createComponent(PostsComponent);  // create comp instance
        // const component = fixture.componentInstance;  // gives the properties of comps
        // expect(component).toBeDefined(); // adds comp

        mockPostService = jasmine.createSpyObj(['getPosts', 'deletePosts']);


        // TestBed.configureTestingModule({
        //     providers: [PostsComponent,  // here the comp added , because comp's class only tested.
        //         {
        //             provide: PostsService,
        //             // useValue: mockPostService
        //             useClass: mockPostsServiceCurrent
        //         }]
        // })

        // postComponent = TestBed.inject(PostsComponent);
        // postService = TestBed.inject(mockPostsServiceCurrent);


        TestBed.configureTestingModule({
            declarations: [PostsComponent, PostComponent,
                // FakePostcomponent
            ],
            providers: [{
                provide: PostsService,
                useValue: mockPostService
                // useClass: mockPostsServiceCurrent
            }],
            // schemas : [NO_ERRORS_SCHEMA],

        })

        fixture = TestBed.createComponent(PostsComponent);
        postComponent = fixture.componentInstance;

        // fixture = TestBed.createComponent(PostComponent);
        // postComponent = fixture.componentInstance;

    });


    describe('delete', () => {
        beforeEach(() => {
            mockPostService.deletePosts.and.returnValue(of(true));
            postComponent.postList = postList;
        });

        xit('should delete by ID', () => {
            postComponent.deletePost(postList[1]);
            expect(postComponent.postList.length).toBe(2);
        });

        xit('should deleted actual Data by ID', () => {
            postComponent.deletePost(postList[1]);
            for (const iterator of postComponent.postList) {
                expect(iterator).not.toEqual(postList[1]);
                // expect(iterator).toEqual(postList[1]);
            }
        });

        xit('should delete by ID called once', () => {
            pending();
            // spyOn(postService , 'deletePosts').and.callThrough();
            spyOn(mockPostService, 'deletePosts').and.returnValue(of(true));
            postComponent.deletePost(postList[1]);
            expect(mockPostService.deletePosts).toHaveBeenCalledTimes(1);
        });

        xit('should delete by ID called once using as Component', () => {
            postComponent.postList = postList;
            fixture.detectChanges();
            postComponent.deletePost(postList[1]);
            expect(mockPostService.deletePosts).toHaveBeenCalledTimes(1);
        });

        it('call post Service drectly', () => {
            mockPostService.getPosts.and.returnValue(of(postList));
            // fixture.detectChanges();  // also do , init call
            postComponent.ngOnInit();
            expect(postComponent.postList.length).toBe(postList.length);
        });

        it('should check the elements created as per list ---- SHALLOW INTEGRATE TESTING   :: Working', () => {
            // pending();
            mockPostService.getPosts.and.returnValue(of(postList));
            fixture.detectChanges();
            const d_element = fixture.debugElement;
            let postsElement = d_element.queryAll(By.css('.posts'));
            expect(postsElement.length).toBe(postList.length);
        });


        it('should check the elements created as per list ---- DEEP INTEGRATE TESTING', () => {
            mockPostService.getPosts.and.returnValue(of(postList));
            fixture.detectChanges();
            const d_element = fixture.debugElement;
            let postsElement = d_element.queryAll(By.directive(PostComponent));
            expect(postsElement.length).toBe(postList.length);
        });


        it('should check the Post send to chiledComp ---- DEEP INTEGRATE TESTING', () => {
            mockPostService.getPosts.and.returnValue(of(postList));
            fixture.detectChanges();
            const d_element = fixture.debugElement;
            let postsElement = d_element.queryAll(By.directive(PostComponent));
            // const d_element = fixture.debugElement.componentInstance;

            for (let index = 0; index < postsElement.length; index++) {
                let postCompinstance = postsElement[index].componentInstance as PostComponent;
                expect(postCompinstance.post.title).toEqual(postList[index].title);
            }
        });


        it('should check the Post components delete clicked ', () => {
            spyOn(postComponent, 'deletePost');
            mockPostService.getPosts.and.returnValue(of(postList));
            fixture.detectChanges();
            const d_element = fixture.debugElement;
            let postsElement = d_element.queryAll(By.directive(PostComponent));

            for (let index = 0; index < postsElement.length; index++) {
                postsElement[index].query(By.css('button'))
                    // .triggerEventHandler('click' ,{});
                    // .triggerEventHandler('click', );
                    .triggerEventHandler('click', {});
                expect(postComponent.deletePost).toHaveBeenCalledWith(postList[index]);

            }
        });

        it('should check the Post components by Emit ', () => {
            spyOn(postComponent, 'deletePost');
            mockPostService.getPosts.and.returnValue(of(postList));
            fixture.detectChanges();
            const d_element = fixture.debugElement;
            let postElementList = d_element.queryAll(By.directive(PostComponent));
            for (let index = 0; index < postElementList.length; index++) {
                (postElementList[index].componentInstance as PostComponent).deletePost.emit(postList[0]);
                expect(postComponent.deletePost).toHaveBeenCalledWith(postList[index]);
            }
          
        });


    });
});