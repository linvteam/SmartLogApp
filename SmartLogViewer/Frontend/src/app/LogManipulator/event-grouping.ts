import { LogRow } from "../log.classes";
import { LogService } from "../services/log/log.service";
import { LogManipulator } from "./log-manipulator";

export class EventGrouping implements LogManipulator {

    private logService !: LogService;

    constructor(private groupTime: number) {
        
    }

    setLogService(logService: LogService): void {
        this.logService = logService;
    }

    private eventDateTime(e: LogRow) {
        return (new Date([e.Date, e.Time].join('T').replaceAll('/', '-') + 'Z')).getTime();
    }

    getNumberOfGroups(): number {
        let events = this.logService.getLog().Events.sort((e1: LogRow, e2: LogRow) => {
            return this.eventDateTime(e2) - this.eventDateTime(e1);
        });

        let endDateTime = this.eventDateTime(events[0]);
        let startDateTime = this.eventDateTime(events[events.length - 1]);
        console.log((endDateTime - startDateTime) / this.groupTime)
        return Math.ceil((endDateTime - startDateTime) / this.groupTime);
    }

    getGroup(index: number): LogRow[] {
        let events = this.logService.getLog().Events.sort((e1: LogRow, e2: LogRow) => {
            return this.eventDateTime(e2) - this.eventDateTime(e1);
        });

        let startTime = this.eventDateTime(events[events.length - 1]);

        let startGroupTime = startTime + (index - 1) * this.groupTime;
        let endGroupTime = startTime + index * this.groupTime;

        return events.filter((e: LogRow) => {
            let DateTime = (new Date([e.Date, e.Time].join('T').replaceAll('/', '-') + 'Z')).getTime();
            return DateTime >= startGroupTime && DateTime < endGroupTime;
        });
    }

}
