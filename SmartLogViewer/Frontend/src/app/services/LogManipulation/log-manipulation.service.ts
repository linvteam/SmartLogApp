import { Injectable } from '@angular/core';
import { LogService } from "../log/log.service";
import { LogManipulator } from "../../LogManipulator/log-manipulator";
import { EventSearch } from "../../LogManipulator/event-search";
import { Identity } from "../../LogManipulator/identity"
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LogManipulationService {

    private manipulator = new Subject<LogManipulator>();
    manipulatedLog = this.manipulator.asObservable();

    constructor(private logService: LogService) {
    }

    setManipulation(m: LogManipulator): void {
        m.setLogService(this.logService);
        this.manipulator.next(m);
    }

    getDefaultManipulator(): LogManipulator {
        let man = new Identity();
        man.setLogService(this.logService);
        return man;
    }

}
