import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {


  loggerContent: string[] = [];

  constructor() { }

  addLogs(logData: string) {
    this.loggerContent.push(logData);
  }

  clearLog(){
    this.loggerContent = [];

  }
}
