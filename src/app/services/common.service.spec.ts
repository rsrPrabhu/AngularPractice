import { LoggerService } from "./logger/logger.service";
import { CommonService } from "./common.service";
import { TestBed } from "@angular/core/testing";


function testBedCall() {
  let _loggerService = jasmine.createSpyObj(LoggerService, ['addLogs']);
  TestBed.configureTestingModule({
    providers: [CommonService, {
      provide: LoggerService,
      useValue: _loggerService
    }]
  })

  const _commonService = TestBed.inject(CommonService);
  const loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  return { _commonService, loggerServiceSpy }
}

describe(('commonserviceContext'), () => {

  // beforeEach(() => {  // this call invokes before every function calls
  //   _loggerService = jasmine.createSpyObj(LoggerService, ['addLogs']);
  //   _commonService = new CommonService(_loggerService);
  // });


  it('add function called : 1', () => {
    const { _commonService, loggerServiceSpy } = testBedCall();
    let result = _commonService.addData(10, 6);
    expect(result).toBe(16);
    expect(loggerServiceSpy.addLogs).toHaveBeenCalledTimes(1);
  });

  it('subtract function called : 1', () => {
    const { _commonService, loggerServiceSpy } = testBedCall();
    let result = _commonService.subtractData(10, 6);
    expect(result).toBe(4);
    expect(loggerServiceSpy.addLogs).toHaveBeenCalledTimes(1);
  });

  it('pending Example', () => {
    pending();
  });

  xit('XIT Example', () => { });

  xit('add function result', () => {
    let _loggerService = new LoggerService();
    const _commonService = new CommonService(_loggerService);
    let result = _commonService.addData(5, 6);
    expect(result).toBe(11);
  });

  xit('add function result with function Spying', () => {
    let _loggerService = new LoggerService();
    spyOn(_loggerService, 'addLogs'); // not calling the addLogs Method which is injected in commonservice
    // spyOn(_loggerService, 'addLogs').and.callThrough();  spying and calling the function //
    const _commonService = new CommonService(_loggerService);
    let result = _commonService.addData(5, 6);
    expect(result).toBe(11);
    expect(_loggerService.addLogs).toHaveBeenCalledTimes(1);
  });

  xit('subtract function result with whole service Spying', () => {
    let _loggerService = jasmine.createSpyObj(LoggerService, ['addLogs']);  // whole sevice would not called  because of spying
    // let _loggerService = new LoggerService();
    // spyOn(_loggerService, 'addLogs');
    // spyOn(_loggerService, 'addLogs').and.callThrough();  spying and calling //
    const _commonService = new CommonService(_loggerService);
    let result = _commonService.subtractData(10, 6);
    expect(result).toBe(4);
    expect(_loggerService.addLogs).toHaveBeenCalledTimes(1);
  });

})