import {Injectable} from '@angular/core';
import {Event, Sequence} from "../sequence.classes";
import {Log, LogRow} from "../log.classes";

@Injectable({
    providedIn: 'root'
})
export class SequencesSearchService {

    constructor() {
    }

    findSequences(log : Log, sequence: Sequence): LogRow[][] {

        // Eventi di inizio/fine della sequenza
        let sequences : LogRow[][] = [];

        // Eventi compatibili agli eventi iniziali e finali indicati nella sequenza
        let startEventsFound : LogRow[] = this.findEvents(log, sequence.StartEvents, sequence.StartEventAvailableSubUnits);
        let endEventsFound : LogRow[] = this.findEvents(log, sequence.EndEvents, sequence.EndEventAvailableSubUnits);

        // Se vi sono eventi iniziali e finali compatibili
        if (startEventsFound.length && endEventsFound.length) {
            // Si ordinano per data/ora (crescente) gli eventi iniziali compatibili
            startEventsFound.sort((e1: LogRow, e2 : LogRow) => {
                let e1DateTime : number = (new Date([e1.Date, e1.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
                let e2DateTime : number = (new Date([e2.Date, e2.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
                return e1DateTime - e2DateTime;
            });

            // Si ordinano per data/ora (crescente) gli eventi finali compatibili
            endEventsFound.sort((e1: LogRow, e2 : LogRow) => {
                let e1DateTime : number = (new Date([e1.Date, e1.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
                let e2DateTime : number = (new Date([e2.Date, e2.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
                return e1DateTime - e2DateTime;
            });

            // Variabili che indicano se sono stati trovati tutti i tipi di eventi iniziali / finali nella ricerca di una sequenza
            let sequenceStartEventsFound: boolean[] = [];
            let sequenceEndEventsFound: boolean[] = [];

            // Variabile che conterrà il primo e l' ultimo evento di una sequenza
            let sequenceFound : LogRow[] = [];

            // Inizializzazione a false delle variabili booleane che indicano se gli eventi iniziali / finali si sono trovati
            sequence.StartEvents.forEach(() => sequenceStartEventsFound.push(false));
            sequence.EndEvents.forEach(() => sequenceEndEventsFound.push(false));

            // Data/ora (in ms) del primo evento dell'inizio della sequenza
            let startEventsLowerDateTime = 0;
            
            // Data/ora (in ms) dell'ultimo evento dell'inizio della sequenza
            let startEventsUpperDateTime = 0;

            // Per ogni evento tra quelli iniziali
            for (let startEventFound of startEventsFound){

                startEventsUpperDateTime = (new Date([startEventFound.Date, startEventFound.Time].join('T').replaceAll("/", "-") + "Z")).getTime() ;
                // Se si sta iniziando a cercare una sequenza
                if(sequenceFound.length==0) {
                    startEventsLowerDateTime = (new Date([startEventFound.Date, startEventFound.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
                }

                // Per ogni tipologia di evento iniziale
                sequence.StartEvents.forEach((event, index) => {

                    // Se l'evento iniziale ha una tipologia tra quelle accettate per l'inizio della sequenza e non è ancora stato trovato un evento di quel tipo
                    if(event.Code == startEventFound.Code && !sequenceStartEventsFound[index]) {
                        sequenceStartEventsFound[index] = true;                                                         // Si indica che quel tipo di evento è stato trovato
                        sequenceFound.push(startEventFound);                                                            // Si inserisce l'evento nell'array della sequenza
                    } else if (event.Code == startEventFound.Code && sequenceStartEventsFound[index]) {                 // Altrimenti, se un evento di quel tipo è già stato trovato
                        let indexOfElementToRemove = 0;
                        sequenceFound.forEach( ( row: LogRow, index: number) => {                                       // Si cerca l'evento tra quelli salvati nella sequenza
                            if (row.Code == event.Code){
                                indexOfElementToRemove = index;
                            }
                        });
                        sequenceFound.splice(indexOfElementToRemove,1);                                      // Si rimuove l'elemento dalla sequenza
                        sequenceFound.push(startEventFound);                                                            // Si inserisce l'evento nell'array della sequenza

                        // Se si sostituisce l'evento più vecchio
                        if (indexOfElementToRemove == 0){
                            // Si sostituisce la data di inizio della serie di eventi di inizio con quella dell'evento più vecchio presente
                            startEventsLowerDateTime = (new Date([sequenceFound[0].Date, sequenceFound[0].Time].join('T').replaceAll("/", "-") + "Z")).getTime() ;    
                        }
                    }

                });
                // Analizzato un evento del log ed eventualmente inserito nell'array degli eventi di partenza

                // Controlla se sono stati trovati tutti gli eventi di inizio sequenza
                let foundAllStartEvents : boolean = true;
                sequenceStartEventsFound.forEach((foundEvent) => { foundAllStartEvents = foundAllStartEvents && foundEvent});

                // Se sono stati trovati tutti gli eventi di inizio
                if(foundAllStartEvents) {
                    
                    // Si riporta allo stato iniziale la variabile per tracciare i tipi di evento di inizio della sequenza trovati
                    sequenceStartEventsFound = sequenceStartEventsFound.map(() => false);

                    // Data/ora (in ms) dell'ultimo evento della fine della sequenza
                    let endEventDateTime = 0;
                    
                    // Variabile per indicare se si è trovata o meno la sequenza
                    let foundSequence = false;

                    // Controllo degli eventi di fine
                    for (let endEventFound of endEventsFound) {
                        endEventDateTime = (new Date([endEventFound.Date, endEventFound.Time].join('T').replaceAll("/", "-") + "Z")).getTime() ;
                        // Se l'evento avviene dopo l'ultimo evento di inizio sequenza
                        if(startEventsUpperDateTime < endEventDateTime) {


                            // Per ogni tipologia di evento finale
                            sequence.EndEvents.forEach((event, index) => {

                                // Se l'evento finale ha una tipologia tra quelle accettate per la fine della sequenza e non è ancora stato trovato un evento di quel tipo
                                if (event.Code == endEventFound.Code && !sequenceEndEventsFound[index]) {
                                    sequenceEndEventsFound[index] = true;                                               // Si indica che quel tipo di evento è stato trovato
                                    sequenceFound.push(endEventFound);                                                  // Si inserisce l'evento nell'array della sequenza
                                }

                            });

                            // Controlla se sono stati trovati tutti gli eventi di fine sequenza
                            let foundAllEndEvents : boolean = true;
                            sequenceEndEventsFound.forEach((foundEvent) => { foundAllEndEvents = foundAllEndEvents && foundEvent});

                            // Se sono stati trovati tutti gli eventi di fine sequenza
                            if(foundAllEndEvents) {

                                // Si riporta allo stato iniziale la variabile per tracciare i tipi di evento di fine della sequenza trovati
                                sequenceEndEventsFound = sequenceEndEventsFound.map(() => false);

                                // Se la sequenza di eventi individuati avviene entro il tempo massimo
                                if(endEventDateTime - startEventsLowerDateTime < sequence.MaxDuration) {
                                    foundSequence = true;                                                                                   // La sequenza è stata trovata
                                    sequences.push(sequenceFound.slice());                                                                  // Gli eventi di inizio e fine sono salvati
                                    endEventsFound = endEventsFound.filter((event) => {return !sequenceFound.includes(event)} );    // Gli eventi di fine già presenti in altre sequenze vengono rimossi dagli eventi utilizzabili per individuare altre occorenze
                                }
                                sequenceFound.splice(0);                                                                                // Si svuota la struttura dati di appoggio degli eventi
                            }
                        }
                        if(foundSequence)                                                                               // Se la sequenza è stata trovata
                            break;                                                                                      // Si smette di controllare gli eventi di fine, cominciando a cercare un'altra occorrenza della sequenza

                    }

                }

            }
        }
        
        // Sequenza di eventi completa
        let completeSequences : LogRow[][] = [];
        
        // Per ogni occorrenza di sequenza individuata, si ricavano tutti gli elementi tra il primo evento iniziale e l'ultimo evento finale
        sequences.forEach((sequence) => {
            let first = log.Events.indexOf(sequence[0]);
            let last = log.Events.indexOf(sequence[sequence.length-1]);            
            completeSequences.push(log.Events.slice(first, last+1));    // NB: last+1 perché il metodo "slice" non restituisce l'ultimo elemento se si usa il parametro "end"
        });
        console.log(completeSequences);
        return completeSequences;

    }

    // Funzione per trovare gli eventi del file di log uguali ad una serie di eventi passati
    private findEvents(log : Log, EventsToFind : Event[], acceptedSubUnits: number[]) : LogRow[] {
        let eventsFound : LogRow[] = [];
        for (let event of EventsToFind) {
            eventsFound = eventsFound.concat(this.findEvent(log, event, acceptedSubUnits));
        }
        return eventsFound;
    }

    // Funzione per trovare gli eventi del file di log uguali ad un evento passato
    private findEvent(log : Log, eventToFind: Event, acceptedSubUnits: number[]) : LogRow[] {
        return log.Events.filter((e: LogRow) => {
            return e.Code == eventToFind.Code && e.Value == eventToFind.Status && acceptedSubUnits.includes(e.SubUnit);
        });
    }

}
