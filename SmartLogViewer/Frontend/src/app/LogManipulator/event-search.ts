import { LogManipulator } from "./log-manipulator";
import { Log, LogRow, Header } from "../log.classes"
import { LogService } from "../services/log/log.service";

export class EventSearch implements LogManipulator {

    private logService!: LogService;

    private searchTokens: string[];

    constructor(queryString: string) {
        this.searchTokens = new Array<string>();

        if (queryString != "") {
            // Prende tutte le stringe contenute tra apici e poi rimuove gli apici
            let tokens1 = queryString.match(/['|"](.*?)['|"]/g)?.map(str => str.replace(/["']/g, ""));

            // Raccoglie tutte le stringe fuori dagli apici, separa le parole e toglie gli spazi bianchi
            let tokens2 = queryString.replace(/['|"](.*?)['|"]/g, "").split(" ").filter(entry => /\S/.test(entry));
            if(tokens1 != undefined)
                this.searchTokens = this.searchTokens.concat(tokens1);

            if (tokens2 != undefined)
                this.searchTokens = this.searchTokens.concat(tokens2);
        }
    }

    setLogService(logService: LogService): void {
        this.logService = logService;
    }

    getNumberOfGroups(): number {
        return 1;
    }

    getGroup(_: number): LogRow[] {

        let events = this.logService.getLog().Events;

        for (let s of this.searchTokens)
            events = events.filter(logRow => this.search(logRow, new RegExp(s, "i")));

        return events;

    }

    private search(logRow: LogRow, searchString: RegExp): boolean {

        if (searchString.test(String(logRow.Date))) return true;
        if (searchString.test(String(logRow.Time))) return true;
        if (searchString.test(String(logRow.Unit))) return true;
        if (searchString.test(String(logRow.SubUnit))) return true;
        if (searchString.test(logRow.Code)) return true;
        if (searchString.test(logRow.Description)) return true;
        if (searchString.test(`${logRow.Value}`)) return true;

        return false;
    }
}
