import { LogRow } from "../log.classes";
import { LogService } from "../services/log/log.service";
import { LogManipulator } from "./log-manipulator";

export class EventGrouping implements LogManipulator {

    private groupedEvents: LogRow[][] = [];
    private logService !: LogService;

    constructor(private groupTime: number) {
        
    }

    setLogService(logService: LogService): void {
        this.logService = logService;

        let events = this.logService.getLog().Events.sort((e1: LogRow, e2: LogRow) => {
            return this.eventDateTime(e2) - this.eventDateTime(e1);
        });

        let currentGroupIndex = 0;
        let startTime = this.eventDateTime(events[0]);
        let currentEventsGroup: LogRow[] = [];
        for (let e of events) {
            let eventGroupIndex = Math.ceil((this.eventDateTime(e) - startTime) / this.groupTime);
            if (eventGroupIndex == currentGroupIndex) {
                currentEventsGroup.push(e);
            } else {
                this.groupedEvents.push(currentEventsGroup);
                currentGroupIndex = eventGroupIndex;
                currentEventsGroup = [ e ];
            }
        }
    }

    private eventDateTime(e: LogRow) {
        return (new Date([e.Date, e.Time].join('T').replaceAll('/', '-') + 'Z')).getTime();
    }

    getNumberOfGroups(): number {
        return this.groupedEvents.length;
    }

    getGroup(index: number): LogRow[] {
        return this.groupedEvents[index - 1];
    }

}
