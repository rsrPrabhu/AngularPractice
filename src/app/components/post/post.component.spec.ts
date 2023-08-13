import { Post } from "src/app/model/Post";
import { PostComponent } from "./post.component";
import { first } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";

//  angular Universal

describe('PostComponent', () => {
    let fixture: ComponentFixture<PostComponent>;
    let comp: PostComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PostComponent],
            // schemas : [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(PostComponent);
        comp = fixture.componentInstance;
    });

    xit('DebugElement ::: template test syntax', () => {
        //  debug element vs HTML element
        //  debug element can check without dependency of DOM .. 
        const debugElement: DebugElement = fixture.nativeElement;
        const compElement: HTMLElement = debugElement.nativeElement;
        const tag_P = compElement.querySelector('P');
        expect(tag_P?.textContent).toEqual('banner works');
    });

    xit('HTMLElement  ::: template test syntax', () => {
        //  debug element vs HTML element
        const compElement: HTMLElement = fixture.nativeElement;
        const tag_P = compElement.querySelector('P');
        expect(tag_P?.textContent).toEqual('banner works');
    });

    // performance is poor :: 'cos search elements
    xit('SSR ::: template syntax by CSS', () => {
        const debugElement: DebugElement = fixture.nativeElement;
        const debug_para = debugElement.query(By.css('p')); // !important
        const compElement: HTMLElement = debug_para.nativeElement;
        expect(compElement?.textContent).toEqual('banner works');
    });

    it('Check anchor Tag Data with HTML testing', () => {
        let postParam: Post = { id: 2, title: 'title 2', body: 'body content 2' };
        comp.post = postParam;
        fixture.detectChanges();
        const postElement: HTMLElement = fixture.nativeElement;
        const a = postElement.querySelector('a');
        expect(a?.textContent).toContain(postParam.title); // *** text content is important
    });

    it('Check anchor Tag Data with HTML testing  using DEBUG element', () => {
        let postParam: Post = { id: 2, title: 'title 2', body: 'body content 2' };
        comp.post = postParam;
        fixture.detectChanges();
        const postDebugElement: DebugElement = fixture.debugElement;
        const aDebugElet: HTMLElement = postDebugElement.query(By.css('a')).nativeElement;
        expect(aDebugElet?.textContent).toContain(postParam.title); // *** text content is important
    });

    it('is comp defined using Testbed', () => {
        expect(comp).toBeDefined();
    })

    it('delete Function Call ', () => {

        // let postComp = new PostComponent();
        let postParam: Post = { id: 2, title: 'title 2', body: 'body content 2' };

        comp.post = postParam;
        comp.deletePost.pipe(first()).subscribe(selectedPost => {   // its for emit called or not che ck
            expect(selectedPost).toEqual(postParam);
        });

        // postComp.onDeletePost(new MouseEvent('click'))
        comp.onDeletePost();
    });
});