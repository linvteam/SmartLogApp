import { Injectable } from '@angular/core';
import { Log } from '../log.classes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

    constructor() {
        this.actualLog = undefined;
        this.displayLog = undefined;
    }

    private actualLog?: Log;
    private displayLog?: Log;

    public set Log (log: Log) {
        this.actualLog = log;
        this.displayLog = new Log(this.actualLog as Log)
    }

    public getLog() : Log {
        return (this.actualLog) as Log;
    }

    public getDisplayLog(): Log {
        return (this.displayLog) as Log;
    }

    public resetDisplayLog(): void {
        if (this.validLog()) {
            this.displayLog = new Log(this.actualLog as Log)
        }
    }

    public filterEvents(searchString: any): void {

        this.resetDisplayLog();

        if (this.displayLog == undefined || searchString == undefined || searchString == null) return;

        const events = this.displayLog.Events;

        console.log(new RegExp(searchString))
        for (let i = 0; i < events.length; i++) {
            if (!events[i].search(new RegExp(searchString))) {
                events.splice(i, 1);
                i--;
            }

        }


        this.displayLog.Events = events;

        console.log('**** ARRAY LENGTH ****\n >>> %d <<<', this.displayLog.Events.length)
    }

    public validLog(): boolean {
        return this.actualLog != undefined;
    }

    public clean(): void {
        this.actualLog = undefined;
        this.displayLog = undefined;
    }

}
