import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Log, LogRow } from "../log.classes";
import { LogService } from 'src/app/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class EventSearchService {

    private logSource = new BehaviorSubject<Log | undefined>(undefined);
    currentValue = this.logSource.asObservable();

    constructor(private logService: LogService) { }

    filterEvents(searchString: string): void {

        let events = [...this.logService.getLog().Events]
        if (searchString == undefined || searchString == null) {
            this.logService.getDisplayLog().Events = events;

            this.logSource.next(this.logService.getDisplayLog());
        }

        const stringList1 = searchString.match(/\'(.*?)\'/g)?.map(str => str.replace(/["']/g, ""))

        const stringList2 = searchString.replace(/\'(.*?)\'/g, "").split(" ").filter(entry => /\S/.test(entry));

        let stringList = [];

        if (stringList1 != undefined) {
            stringList = stringList1.concat(stringList2);
        }
        else
            stringList = stringList2

        for (let s of stringList) {
            events = events.filter(logRow => this.search(logRow, new RegExp(s)));
        }
        
        this.logService.getDisplayLog().Events = events;

        this.logSource.next(this.logService.getDisplayLog())
    }

    private search(logRow: LogRow, searchString: RegExp): boolean {

        if (searchString.test(logRow.Date + " - " + logRow.Time)) return true;
        if (searchString.test(logRow.Unit + "")) return true;
        if (searchString.test(logRow.SubUnit + "")) return true;
        if (searchString.test(logRow.Code)) return true;
        if (searchString.test(logRow.Description)) return true;
        if (searchString.test(`${logRow.Value}`)) return true;

        return false;
    }
}
