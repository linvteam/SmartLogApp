import { LogRow } from "../log.classes";
import { LogService } from "../services/log/log.service";

export interface LogManipulator {

    setLogService(logService: LogService): void;
    getNumberOfGroups(): number;
    getGroup(index: number): LogRow[];

}
