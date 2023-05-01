import { Injectable } from '@angular/core';
import { Log } from '../log.classes';

@Injectable({
  providedIn: 'root'
})
export class LogService {

    private actualLog?: Log;

    constructor() {
        this.actualLog = undefined;
    }

    public set Log (log: Log) {
        this.actualLog = log;
    }

    public getLog() : Log {
        return (this.actualLog) as Log;
    }

    public validLog(): boolean {
        return this.actualLog != undefined;
    }

    public clean(): void {
        this.actualLog = undefined;
    }

}
