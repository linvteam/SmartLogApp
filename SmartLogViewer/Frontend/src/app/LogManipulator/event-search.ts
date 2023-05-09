import { LogManipulator } from "./log-manipulator";
import { Log, LogRow, Header } from "../log.classes"
import { LogService } from "../services/log/log.service";

/**
 * Questa classe si occupa di filtrare gli eventi in base ad una query di ricerca
 */
export class EventSearch implements LogManipulator {

    /**
     * Log service che fornisce l'elenco di eventi
     */
    private logService!: LogService; 

    /**
     * I token di ricerca
     */
    private searchTokens: string[];

    /**
     * Costruisce una classe che fornisce una funzionalità di filtraggio in base alla query di ricerca
     * @param queryString Query di ricerca 
     */
    constructor(queryString: string) {
        this.searchTokens = new Array<string>();

        if (queryString != "") {
            // Prende tutte le stringe contenute tra apici e poi rimuove gli apici
            let tokens1 = queryString.match(/['|"](.*?)['|"]/g)?.map(str => str.replace(/["']/g, ""));

            // Raccoglie tutte le stringe fuori dagli apici, separa le parole e toglie gli spazi bianchi
            let tokens2 = queryString.replace(/['|"](.*?)['|"]/g, "").split(" ").filter(entry => /\S/.test(entry));

            // Unisco tutti i token 
            if(tokens1 != undefined)
                this.searchTokens = this.searchTokens.concat(tokens1);

            if (tokens2 != undefined)
                this.searchTokens = this.searchTokens.concat(tokens2);
        }
    }

    /**
     * Imposta il logService su cui eseguire le ricerche
     * @param logService il log service che fornisce gli eventi
     */
    setLogService(logService: LogService): void {
        this.logService = logService;
    }

    /**
     * Ottiene sempre 1 perchè la ricerca non produce gruppi multipli
     * @returns Sempre il numero 1
     */
    getNumberOfGroups(): number {
        return 1;
    }

    /**
     * Ottene i risultati della ricerca
     * @param _ Il numero del gruppo di eventi, in questa classe viene ignorato
     * @returns Gli eventi che rispettano i token di ricerca
     */
    getGroup(_: number): LogRow[] {

        let events = this.logService.getLog().Events;

        for (let s of this.searchTokens)
            events = events.filter(logRow => this.search(logRow, new RegExp(s, "i")));

        return events;

    }

    /**
     * Funzione di ricerca
     * @param logRow l'evento su cui cercare
     * @param searchString Regex che rappresenta un token di ricerca
     * @returns true se uno dei campi dell'evento rispetta la regex, false altrimenti
     */
    private search(logRow: LogRow, searchString: RegExp): boolean {

        if (searchString.test(String(logRow.Date))) return true;
        if (searchString.test(String(logRow.Time))) return true;
        if (searchString.test(String(logRow.Unit))) return true;
        if (searchString.test(String(logRow.SubUnit))) return true;
        if (searchString.test(logRow.Code)) return true;
        if (searchString.test(logRow.Description)) return true;
        if (searchString.test(String(logRow.Value))) return true;

        return false;
    }
}
