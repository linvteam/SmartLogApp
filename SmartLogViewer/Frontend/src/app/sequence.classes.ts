export class Event {
    private code: string;
    private status: boolean;
    
    constructor(event: Event) {
        this.code = event.code;
        this.status = event.status;
    }
    
    public get Code() {
        return this.code;
    }
    
    public get Status() {
        return this.status;
    }
}

export class Sequence {
    private name: string;
    private startEventsAvailableSubUnits: number[] = [];
    private startEvents: Event[] = [];
    private endEventsAvailableSubUnits: number[] = [];
    private endEvents: Event[] = [];
    private maxDuration: number;

    constructor(sequence: Sequence) {
        this.name = sequence.name;
        sequence.startEventsAvailableSubUnits.forEach((subUnit) => this.startEventsAvailableSubUnits.push(subUnit));
        sequence.startEvents.forEach((event) => this.startEvents.push(new Event(event)));
        sequence.endEventsAvailableSubUnits.forEach((subUnit) => this.endEventsAvailableSubUnits.push(subUnit));
        sequence.endEvents.forEach((event) => this.endEvents.push(new Event(event)));
        this.maxDuration = sequence.maxDuration;
    }

    public get Name() {
        return this.name;
    }

    public get StartEventAvailableSubUnits() {
        return this.startEventsAvailableSubUnits;
    } 

    public get StartEvents() {
        return this.startEvents;
    }

    public get EndEventAvailableSubUnits() {
        return this.endEventsAvailableSubUnits;
    }

    public get EndEvents() {
        return this.endEvents;
    }

    public get MaxDuration() {
        return this.maxDuration;
    }
    
}