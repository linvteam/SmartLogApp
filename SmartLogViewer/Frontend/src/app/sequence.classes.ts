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
    private startEventAvailableSubUnits: number[];
    private startEvents: Event[];
    private endEventAvailableSubUnits: number[];
    private endEvents: Event[];
    private maxDuration: number;

    constructor(sequence: Sequence) {
        this.name = sequence.name;
        this.startEventAvailableSubUnits = sequence.startEventAvailableSubUnits;
        this.startEvents = sequence.startEvents;
        this.endEventAvailableSubUnits = sequence.endEventAvailableSubUnits;
        this.endEvents = sequence.endEvents;
        this.maxDuration = sequence.maxDuration;
    }

    public get Name() {
        return this.name;
    }

    public get StartEventAvailableSubUnits() {
        return this.startEventAvailableSubUnits;
    } 

    public get StartEvents() {
        return this.startEvents;
    }

    public get EndEventAvailableSubUnits() {
        return this.endEventAvailableSubUnits;
    }

    public get EndEvents() {
        return this.endEvents;
    }

    public get MaxDuration() {
        return this.maxDuration;
    }
    
}