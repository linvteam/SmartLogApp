import { Injectable } from '@angular/core';
import { LogRow } from "../log.classes";
import { LogService } from 'src/app/services/log.service';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventSearchService {

    private logSource = new Subject<LogRow[]>();
    filteredLog = this.logSource.asObservable();

    constructor(private logService: LogService) { }

    filterEvents(searchString: string): void {

        // Reset eventi dal log attuale
        let events = [...this.logService.getLog().Events]

        //Se l'utente non da input allora termina
        if (searchString == undefined || searchString == null) {

            this.logSource.next(events);

            return;
        }

        // Raccoglie tutte le stringhe all'interno di apici, prese per intero, poi toglie gli apici
        const stringList1 = searchString.match(/\'(.*?)\'/g)?.map(str => str.replace(/["']/g, ""))

        // Raccoglie tutte le stringhe all' di fuori dei apici, separa le parole e toglie i spazi bianchi
        const stringList2 = searchString.replace(/\'(.*?)\'/g, "").split(" ").filter(entry => /\S/.test(entry));

        let stringList = [];

        if (stringList1 != undefined) {
            stringList = stringList1.concat(stringList2);
        }
        else {
            stringList = stringList2;
        }

        // Si fa la ricerca con search ...
        for (let s of stringList) {
            events = events.filter(logRow => this.search(logRow, new RegExp(s)));
        }

        // ... e infine si invia il risultato alla tabella e al grafico
        this.logSource.next(events)
    }

    private search(logRow: LogRow, searchString: RegExp): boolean {

        if (searchString.test(logRow.Date + " - " + logRow.Time)) return true;
        if (searchString.test(String(logRow.Unit))) return true;
        if (searchString.test(String(logRow.SubUnit))) return true;
        if (searchString.test(logRow.Code)) return true;
        if (searchString.test(logRow.Description)) return true;
        if (searchString.test(`${logRow.Value}`)) return true;

        return false;
    }
}
