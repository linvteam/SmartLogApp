import { LogService } from "../services/log/log.service";
import { LogManipulator } from "./log-manipulator"; 
import { LogRow } from "../log.classes";

export class Identity implements LogManipulator {

    private logService!: LogService;

    setLogService(logService: LogService): void {
        this.logService = logService;
    }

    getNumberOfGroups(): number {
        return 1;
    }

    getGroup(index: number): LogRow[] {
        return this.logService.getLog().Events;
    }

}
