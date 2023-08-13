import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

interface MockData {
    name: string;
}

describe('HTTP Client Testing Module', () => {

    let mockUrl = '/data'
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Dummy actual request using HTTPTestingcontroller', () => {
        const datareq : MockData = {name : 'Testdata'}
        httpClient.get<MockData>(mockUrl).subscribe(resp =>{

        });
        const request =  httpTestingController.expectOne(mockUrl);
        request.flush(datareq);
        expect(request.request.method).toBe('GET');
    });


    it('Dummy actual MULTIPLE request using HTTPTestingcontroller', () => {

        // describe('test 1', () => {
        //     httpClient.get<MockData>(mockUrl).subscribe((res: any) => {
        //         expect(res.length).toEqual(0);
        //     });
        // });
        // describe('test 2', () => {
        //     httpClient.get<MockData>(mockUrl).subscribe((res: any) => {
        //         expect(res).toBe(datareq[0]);
        //     });
        // });
        // describe('test 3', () => {
        //     httpClient.get<MockData>(mockUrl).subscribe((res: any) => {
        //         expect(res.length).toEqual(1);
        //     });
        // });

        const datareq : MockData[] = [{name : 'Testdata'}];
        httpClient.get<MockData>(mockUrl).subscribe((res : any) => {
            expect(res.length).toEqual(0);
        });
        httpClient.get<MockData>(mockUrl).subscribe((res : any) => {
            expect(res).toBe(datareq[0]);
        });
        httpClient.get<MockData>(mockUrl).subscribe((res : any) => {
            expect(res.length).toEqual(1);
        });

        const requests =  httpTestingController.match(mockUrl);
        expect(requests.length).toBe(3);
        requests[0].flush([]);
        requests[1].flush(datareq[0]);
        requests[2].flush(datareq);


        // request.flush(datareq);
        // expect(request.request.method).toBe('GET');
    });
});