import { HttpClient } from "@angular/common/http";
import { PostsService } from "./posts.service"
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";

describe('Post Service', () => {
    let _postService: PostsService;
    let _httpClientSpy: jasmine.SpyObj<HttpClient>;
    let _httpClientSpyType2: jasmine.SpyObj<HttpClient>;
    let postList = [
        { id: 1, title: 'title 1', body: 'body content 1' },
        { id: 2, title: 'title 2', body: 'body content 2' },
        { id: 3, title: 'title 3', body: 'body content 3' },
    ];


    // beforeEach(() => {
    //     _httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    //     _postService = new PostsService(_httpClientSpy);
    // });

    beforeEach(() => {
        _httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers : [PostsService , {
                provide : HttpClient,
                useValue :_httpClientSpy
            }]
        })

        // _postService = new PostsService(_httpClientSpy);
        _postService = TestBed.inject(PostsService);
        _httpClientSpyType2 = TestBed.inject(HttpClient) as  jasmine.SpyObj<HttpClient>;
    });

    describe('getPost', () => {
        it('should return PostList', (done: DoneFn) => {
            _httpClientSpy.get.and.returnValue(of(postList));
            _postService.getPosts().subscribe(res_postList => {
                expect(res_postList).toEqual(postList);
                done();
            });
            expect(_httpClientSpy.get).toHaveBeenCalledTimes(1);
        })

    });
})