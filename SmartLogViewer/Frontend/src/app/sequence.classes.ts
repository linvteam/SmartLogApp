/**
 * Questa classe rappresenta un'occorrenza di un evento che deve essere trovata per identificare una fase della sequenzaa
 */
export class Event {
    /**
     * Code dell'evento
     */
    private code: string;
    /**
     * Valore preso dall'evento 
     */
    private status: boolean;

    /**
     * Costruttore di copia
     * @param event
     */
    constructor(event: Event) {
        this.code = event.code;
        this.status = event.status;
    }

    /**
     * Ottiene il code dell'evento
     */
    public get Code() {
        return this.code;
    }

    /**
     * Ottiene il valore che prende l'evento
     */
    public get Status() {
        return this.status;
    }
}

/**
 * Questa classe rappresenta una sequenza nota
 */
export class Sequence {
    /**
     * Nome della sequenza nota
     */
    private name: string;

    /**
     * Lista delle subunit sulle quale possono scatenarsi gli eventi di inizio della sequenza
     */
    private startEventsAvailableSubUnits: number[] = [];

    /**
     * Lista degli eventi che identificano l'inizio della sequenza
     */
    private startEvents: Event[] = [];

    /**
     * Lista delle subunit sulle quali possono scatenarsi gli eventi di fine della sequenza
     */
    private endEventsAvailableSubUnits: number[] = [];

    /**
     * Lista degli eventi che identificano l'inizio della sequenza
     */
    private endEvents: Event[] = [];

    /**
     * Durata massima della sequenza in millisecondi
     */
    private maxDuration: number;

    /**
     * Costruttore di copia della classe
     * @param sequence Sequenza sorgente da cui effettuare una copia dell'oggetto
     */
    constructor(sequence: Sequence) {
        this.name = sequence.name;
        sequence.startEventsAvailableSubUnits.forEach((subUnit) => this.startEventsAvailableSubUnits.push(subUnit));
        sequence.startEvents.forEach((event) => this.startEvents.push(new Event(event)));
        sequence.endEventsAvailableSubUnits.forEach((subUnit) => this.endEventsAvailableSubUnits.push(subUnit));
        sequence.endEvents.forEach((event) => this.endEvents.push(new Event(event)));
        this.maxDuration = sequence.maxDuration;
    }

    /**
     * Ottene il nome della sequenza
     */
    public get Name(): string {
        return this.name;
    }

    /**
     * Ottene la lista delle sub unit sulle quali possono scatenarsi gli eventi di inizio sequenza
     */
    public get StartEventAvailableSubUnits(): number[] {
        return this.startEventsAvailableSubUnits;
    } 

    /**
     * Ottene la lista di eventi che identificano l'inizio della sequenza
     */
    public get StartEvents(): Event[] {
        return this.startEvents;
    }

    /**
     * Ottene la lista delle subunit sulle quali possono scatenarsi gli eventi di fine sequenza
     */
    public get EndEventAvailableSubUnits(): number[] {
        return this.endEventsAvailableSubUnits;
    }

    /**
     * Ottene la lista di eventi che identificano la fine della sequenza
     */
    public get EndEvents(): Event[] {
        return this.endEvents;
    }

    /**
     * Ottene la durata massima della sequenza in millisecondi
     */
    public get MaxDuration(): number {
        return this.maxDuration;
    }
    
}