import { Injectable } from '@angular/core';
import { LoggerService } from './logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _loggerService : LoggerService) { }

  addData(n1: number, n2: number) {
    this._loggerService.addLogs('addData function called  ...')
    return  n1  + n2 ;
  }

  subtractData(n1: number, n2: number) {
    this._loggerService.addLogs('subtractData function called  ...')
    return  n1  - n2 ;
  }

}
