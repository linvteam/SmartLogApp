import { LogRow } from "../log.classes";
import { LogService } from "../services/log/log.service";
import { LogManipulator } from "./log-manipulator";

/**
 * Questa classe si occupa di gestire il ragguppamento degli eventi su base temporale
 */
export class EventGrouping implements LogManipulator {

    /**
     * Insieme dei gruppi di eventi calcolati
     */
    private groupedEvents: LogRow[][] = []; 

    /**
     * Il logservice per ottenere la lista di eventi, può essere null perchè non viene assegnato dal costruttore
     */
    private logService !: LogService;

    /**
     * Costruisce un classe che raggruppa gli eventi in base ad una durata temporale
     * @param groupTime La durata temporale di un gruppo di eventi
     */
    constructor(private groupTime: number) {
        
    }

    /**
     * Imposta il logService e calcola tutti i gruppi di eventi
     * @param logService Il logService che contiene tutti gli eventi del log
     */
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

    /**
     * Calcola la timestamp di un evento
     * @param e L'evento di cui si vuole conoscere la timestamp
     * @returns La timestamp dell'evento
     */
    private eventDateTime(e: LogRow) {
        return (new Date([e.Date, e.Time].join('T').replaceAll('/', '-') + 'Z')).getTime();
    }

    /**
     * Ottiene il numero di gruppi di eventi calcolati
     * @returns il numero di gruppi di eventi
     */
    getNumberOfGroups(): number {
        return this.groupedEvents.length;
    }

    /**
     * Ottiene il gruppo di eventi identificati dall'indice
     * @param index indice del gruppo che si vuole ottenere
     * @returns Gruppo di eventi voluto
     */
    getGroup(index: number): LogRow[] {
        return this.groupedEvents[index - 1];
    }

}
