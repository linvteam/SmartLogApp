import { Injectable } from '@angular/core';
import { Log } from '../log.classes';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  private actualLog?: Log;

  public set Log (log: Log) {
    this.actualLog = log;
  }

  public getLog() : Log {
    return (this.actualLog) as Log;
  }

}
