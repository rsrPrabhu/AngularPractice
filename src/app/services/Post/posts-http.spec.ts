import { TestBed } from "@angular/core/testing";
import { PostsService } from "./posts.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('Posts (HTTP_Client_Testing Module)', () => {
    let postService: PostsService;
    let _httpTestingController: HttpTestingController;
    let postList = [
        { id: 1, title: 'title 1', body: 'body content 1' },
        { id: 2, title: 'title 2', body: 'body content 2' },
        { id: 3, title: 'title 3', body: 'body content 3' },
    ];
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostsService],
            imports: [HttpClientTestingModule]
        });
        postService = TestBed.inject(PostsService);
        _httpTestingController = TestBed.inject(HttpTestingController);
    });

    describe('GET posts', () => {
        it('should return with HttpClientModule', (done: DoneFn) => {
            postService.getPosts().subscribe((data) => {
                expect(data).toEqual(postList);
                done();
            });
            const request = _httpTestingController.expectOne(postService.getURL);
            request.flush(postList);
            expect(request.request.method).toBe('GET');
        });
    });


    describe('GET post(1)  with multple request stopping', () => {
        xit('should return with HttpClientModule', (done: DoneFn) => {
            postService.getSinglPost(1).subscribe();
            const request = _httpTestingController.expectOne(postService.getURL + '/' + 1);
            // request.flush(postList[1]);
            expect(request.request.method).toBe('GET');

        });
    });

    afterEach(() => {
        _httpTestingController.verify();
    })
});