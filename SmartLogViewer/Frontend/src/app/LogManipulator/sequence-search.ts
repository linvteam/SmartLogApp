import { LogManipulator } from "./log-manipulator";
import { Log, LogRow } from "../log.classes"
import { LogService } from "../services/log/log.service";
import {Sequence, Event} from "../sequence.classes";

/**
 * Questa classe si occupa di cercare una sequenza di eventi specificata
 */
export class SequenceSearch implements LogManipulator {

    /**
     * Log service che fornisce gli eventi
     */
    private logService!: LogService;

    /**
     * Le occorrenze derivanti dalla ricerca di una sequenza
     */
    private currentOccurrences: LogRow[][] = [];

    /**
     * Costruisce una nuova classe che si occupa di cercare la ricerca specificata
     * @param actualSequence La sequenza da cercare
     */
    constructor(private actualSequence: Sequence) {
    }

    /**
     * Imposto il log service ed effettuo la ricerca
     * @param logService il log service che fornisce gli eventi
     */
    setLogService(logService: LogService): void {
        this.logService = logService;
        this.findSequences(this.actualSequence);
    }

    /**
     * Ottiene il numero di risultati da mostrare in gruppo
     * @returns Il numero di sequenze trovate nel file di log
     */
    getNumberOfGroups(): number {
        return Math.max(1, this.currentOccurrences.length);
    }

    /**
     * Ottiene un risultato di ricerca
     * @param index indice del risultato di ricerca voluto
     * @returns Ritorna il risultato di ricerca di indice specificato oppure un array vuoto se non sono state trovate ricerche
     */
    getGroup(index: number): LogRow[] {
        if(this.currentOccurrences.length == 0) 
            return [];

        return this.currentOccurrences[index - 1].slice();
    }

    /**
     * Ottiene un insieme di gruppi di eventi: ogni gruppo è un'occorrenza di una sequenza di eventi
     * @param sequence sequenza da ricercare tra gli eventi disponibili
     */
    private findSequences(sequence: Sequence): void {

        /** PASSI ALGORITMO:
         1): Filtrare i dati del log: si creano due liste (una per gli eventi di inizio ed una per gli eventi di fine compatibili);
         2): Ordinare le liste del punto 1;
         3): Trovare possibili raggruppamenti di eventi che possano scatenare inizio e fine di una sequenza;
         4): Creare una matrice con [lowerdate, upperdate] di intervallo dei raggruppamenti di inizio;
         5): Creare una matrice con [lowerdate, upperdate] di intervallo dei raggruppamenti di fine;
         6): Per ogni raggruppamento di inizio, si verifica se esiste un raggruppamento di fine tale che abbia lowerdate > upperdate del raggruppamento di inizio,
         che upperdate (fine) - lowerdate(inizio) < maxDuration della sequenza:
         SI): I raggruppamento sono inseriti in una struttura dati apposita;
         NO): Si scartano i raggruppamenti e si riparte.
         */

        // Rimuovo le occorrenze già presenti
        this.currentOccurrences = [];

        // Eventi di inizio/fine della sequenza
        let sequences: LogRow[][] = [];
        
        // Il log attuale
        let log : Log = this.logService.getLog();

        //Filtrare i dati del log: si creano due liste (una per gli eventi di inizio ed una per gli eventi di fine compatibili);
        let startEventsFound: LogRow[] = this.findEvents(log, sequence.StartEvents, sequence.StartEventAvailableSubUnits);
        let endEventsFound: LogRow[] = this.findEvents(log, sequence.EndEvents, sequence.EndEventAvailableSubUnits);

        // Se vi sono eventi iniziali e finali compatibili
        if (startEventsFound.length && endEventsFound.length) {

            let startGroups: LogRow[][];
            let endGroups: LogRow[][];

            let startGroupsDateBounds: number[][];
            let endGroupsDateBounds: number[][];

            //Ordinare le liste
            this.sortEvents(startEventsFound);
            this.sortEvents(endEventsFound);

            //Trovare i raggruppamenti
            startGroups = this.findStartGroups(startEventsFound, sequence);
            endGroups = this.findEndGroups(endEventsFound, sequence);

            //Trovare gli intervalli temporali dei raggruppamenti di inizio (matrici 2xn dove n è il numero di gruppi, nella prima colonna c'è il lower bound e 
            // nella seconda c'è l'upper bound
            startGroupsDateBounds = this.findTimeBoundaries(startGroups);
            endGroupsDateBounds = this.findTimeBoundaries(endGroups);

            //Per ogni raggruppamento di inizio, si verifica se esiste un raggruppamento di fine tale che abbia lowerdate > upperdate del raggruppamento di inizio,
            //          che upperdate (fine) - lowerdate(inizio) < maxDuration della sequenza

            let visited : number = 0;
            for (let i = 0; i < startGroups.length; i++) {
                let foundSequence = false;
                for (let j = visited; j < endGroups.length && !foundSequence; j++) {
                    if (endGroupsDateBounds[j][0] > startGroupsDateBounds[i][1] && endGroupsDateBounds[j][1] - startGroupsDateBounds[i][0] < sequence.MaxDuration) {
                        sequences.push(startGroups[i].slice().concat(endGroups[j].slice()));
                        foundSequence = true;
                        visited = j+1;
                    }
                }
            }
            // Sequenza di eventi completa
            let completeSequences: LogRow[][] = [];

            // Per ogni occorrenza di sequenza individuata, si ricavano tutti gli elementi tra il primo evento iniziale e l'ultimo evento finale
            this.extractSequences(sequences, log, completeSequences);

            this.currentOccurrences = completeSequences.slice();

        }
    }


    /**
     * Estrazione di tutti gli eventi delle sequenze trovate a partire dai loro eventi di inizio e fine
     * @param sequences insiemi di gruppi di eventi in cui ogni gruppo contiene gli eventi iniziali e finali di un'occorrenza di una sequenza 
     * @param log file di log attualmente attivo
     * @param completeSequences insiemi di gruppi di eventi in cui ogni gruppo contiene tutti gli eventi di un'occorrenza di una sequenza
     */
    private extractSequences(sequences: LogRow[][], log: Log, completeSequences: LogRow[][]): void {
        sequences.forEach((sequence) => {
            // Indici degli eventi di inizio/fine sequenza
            let indexes: number [] = [];

            sequence.forEach((row) => indexes.push(log.Events.indexOf(row)));                                   // Si ricavano gli indici degli eventi di inizio e fine
            indexes.sort((index1: number, index2: number) => {
                return index1 - index2
            });                                                                                                         // Si ordinano gli indici (non è detto che arrivino ordinati data la presenza di eventi con medesimo date/time
            completeSequences.push(log.Events.slice(indexes[0], indexes[indexes.length - 1] + 1));                      // Si inseriscono tutti gli eventi dell'occorrenza della sequenza in un'apposita struttura 
                                                                                                                        // NB: +1 perché il metodo "slice" non restituisce l'ultimo elemento se si usa il parametro "end"
        });
    }

    /** Trova gli eventi del file di log uguali ad una serie di eventi passati
     * @param log il file di log attuale
     * @param EventsToFind l'insieme di eventi da trovare
     * @param acceptedSubUnits le sottounità in cui gli eventi passati possono essere avvenuti
     * @returns Ritorna gli eventi dei tipi richiesti e che riguardano le sottounità indicate
     */
    private findEvents(log : Log, EventsToFind : Event[], acceptedSubUnits: number[]) : LogRow[] {
        let eventsFound : LogRow[] = [];
        for (let event of EventsToFind) {
            eventsFound = eventsFound.concat(this.findEvent(log, event, acceptedSubUnits));
        }
        return eventsFound;
    }
    
    /** Trova gli eventi del file di log uguali ad un evento passato
     * 
     * @param log il file di log attuale
     * @param eventToFind l'evento da trovare
     * @param acceptedSubUnits le sottounità in cui l'evento passato può essere avvenuto
     * @returns Ritorna gli eventi del tipo richiesto e che riguardano le sottounità indicate 
     */
    private findEvent(log : Log, eventToFind: Event, acceptedSubUnits: number[]) : LogRow[] {
        return log.Events.filter((e: LogRow) => {
            return e.Code == eventToFind.Code && e.Value == eventToFind.Status && acceptedSubUnits.includes(e.SubUnit);
        });
    }

    /**
     * Ordina un insieme di eventi per data/ora crescente
     * @param events eventi da ordinare 
     */
    private sortEvents(events:LogRow[]) {
        events.sort((e1: LogRow, e2 : LogRow) => {
            let e1DateTime : number = (new Date([e1.Date, e1.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
            let e2DateTime : number = (new Date([e2.Date, e2.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
            return e1DateTime - e2DateTime;
        });

    }

    /**
     * Trova gruppi di eventi che possono far iniziare un'occorrenza di una sequenza
     * @param startEvents eventi di inizio da cui trovare occorrenze degli eventi di inizio
     * @param sequence sequenza contenente i tipi di eventi di inizio
     * @returns Ritorna gruppi di eventi che possono far iniziare un'occorrenza di una sequenza
     */
    private findStartGroups(startEvents: LogRow[], sequence: Sequence) : LogRow[][] {
        let groups : LogRow[][] = [];
        let sequenceFound : LogRow[] = [];
        let sequenceStartEventsFound : boolean[] = [];
        sequence.StartEvents.forEach( () => {sequenceStartEventsFound.push(false)});

        // Per ogni evento tra quelli iniziali
        for (let startEvent of startEvents){

            // Per ogni tipologia di evento iniziale
            sequence.StartEvents.forEach((event, index) => {

                // Se l'evento iniziale ha una tipologia tra quelle accettate per l'inizio della sequenza e non è ancora stato trovato un evento di quel tipo
                if (event.Code == startEvent.Code && !sequenceStartEventsFound[index]) {
                    sequenceStartEventsFound[index] = true;                                                         // Si indica che quel tipo di evento è stato trovato
                } else if (event.Code == startEvent.Code && sequenceStartEventsFound[index]) {                 // Altrimenti, se un evento di quel tipo è già stato trovato
                    let indexOfElementToRemove = 0;
                    sequenceFound.forEach((row: LogRow, index: number) => {                                       // Si cerca l'evento tra quelli salvati nella sequenza
                        if (row.Code == event.Code) {
                            indexOfElementToRemove = index;
                        }
                    });
                    sequenceFound.splice(indexOfElementToRemove, 1);                                      // Si rimuove l'elemento dalla sequenza
                }
                sequenceFound.push(startEvent);                                                            // Si inserisce l'evento nell'array della sequenza
            });

            // Controlla se sono stati trovati tutti gli eventi di inizio sequenza
            let foundAllStartEvents : boolean = true;
            sequenceStartEventsFound.forEach((foundEvent) => { foundAllStartEvents = foundAllStartEvents && foundEvent});

            // Se sono stati trovati tutti gli eventi di inizio
            if(foundAllStartEvents) {

                // Si riporta allo stato iniziale la variabile per tracciare i tipi di evento di inizio della sequenza trovati
                sequenceStartEventsFound = sequenceStartEventsFound.map(() => {
                    return false
                });
                groups.push(sequenceFound.slice());

                // Si rimuovono i gruppi di eventi (anche parziali)
                sequenceFound.splice(0);
            }
        }
        return groups;
    }

    /**
     * Trova gruppi di eventi che possono far finire un'occorrenza di una sequenza
     * @param endEvents eventi di fine da cui trovare occorrenze degli eventi di fine
     * @param sequence sequenza contenente i tipi di eventi di fine
     * @returns Ritorna gruppi di eventi che possono far finire un'occorrenza di una sequenza
     */
    private findEndGroups(endEvents: LogRow[], sequence: Sequence) : LogRow[][] {
        let groups : LogRow[][] = [];
        let sequenceFound : LogRow[] = [];
        let sequenceEndEventsFound : boolean[] = [];
        sequence.EndEvents.forEach( () => {sequenceEndEventsFound.push(false)});

        // Per ogni evento tra quelli finali
        for (let endEvent of endEvents){

            // Per ogni tipologia di evento finale
            sequence.EndEvents.forEach((event, index) => {

                // Se l'evento finale ha una tipologia tra quelle accettate per la fine della sequenza e non è ancora stato trovato un evento di quel tipo
                if (event.Code == endEvent.Code && !sequenceEndEventsFound[index]) {
                    sequenceEndEventsFound[index] = true;                                                         // Si indica che quel tipo di evento è stato trovato
                    sequenceFound.push(endEvent);                                                            // Si inserisce l'evento nell'array della sequenza
                }
            });

            // Controlla se sono stati trovati tutti gli eventi di inizio sequenza
            let foundAllEndEvents : boolean = true;
            sequenceEndEventsFound.forEach((foundEvent) => { foundAllEndEvents = foundAllEndEvents && foundEvent});

            // Se sono stati trovati tutti gli eventi di inizio
            if(foundAllEndEvents) {

                // Si riporta allo stato iniziale la variabile per tracciare i tipi di evento di inizio della sequenza trovati
                sequenceEndEventsFound = sequenceEndEventsFound.map(() => {
                    return false
                });
                groups.push(sequenceFound.slice());
                // Si rimuovono i gruppi di eventi (anche parziali)
                sequenceFound.splice(0);
            }

        }
        return groups;
    }

    /**
     * Trova l'intervallo temporale in cui sono compresi i gruppi di eventi in ingresso
     * @param groups gruppi di eventi
     * @returns Ritorna l'intervallo temporale in cui sono compresi i gruppi di eventi in ingresso
     */
    private findTimeBoundaries(groups: LogRow[][]) : number[][] {
        let boundaries: number[][] = [];
        for (let group of groups) {
            let singleBound : number[] = [];
            this.sortEvents(group);

            singleBound.push((new Date([group[0].Date, group[0].Time].join('T').replaceAll("/", "-") + "Z")).getTime());
            singleBound.push((new Date([group[group.length-1].Date, group[group.length-1].Time].join('T').replaceAll("/", "-") + "Z")).getTime());

            boundaries.push(singleBound.slice());
        }
        return boundaries;
    }
}
