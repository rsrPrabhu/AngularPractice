import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    })
    service = TestBed.inject(LoggerService);
    // service = new LoggerService();
  });
  //  arrange // act // assert (AAA) pattern

  it('is msg count 0', () => {
    expect(service.loggerContent.length).toBe(0);
  })

  it('is msg added', () => {
    let result = service.addLogs('test');
    expect(service.loggerContent.length).toBe(1);
  })

  it('is loggerContent cleared', () => {
    let result = service.addLogs('test');
    service.clearLog();
    expect(service.loggerContent.length).toBe(0);
  })
});
