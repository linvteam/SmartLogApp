export class Sequence {
    private name: string;
    private startEventAvailableSubUnits: number[];
    private startEvent: string;
    private startEventState: boolean;
    private endEventAvailableSubUnits: number[];
    private endEvent: string;
    private endEventState: boolean;
    private maxDuration: number;

    constructor(sequence: Sequence) {
        this.name = sequence.name;
        this.startEventAvailableSubUnits = sequence.startEventAvailableSubUnits;
        this.startEvent = sequence.startEvent;
        this.startEventState = sequence.startEventState;
        this.endEventAvailableSubUnits = sequence.endEventAvailableSubUnits;
        this.endEvent = sequence.endEvent;
        this.endEventState = sequence.endEventState;
        this.maxDuration = sequence.maxDuration;
    }

    public get Name() {
        return this.name;
    }

    public get StartEventAvailableSubUnits() {
        return this.startEventAvailableSubUnits;
    } 

    public get StartEvent() {
        return this.startEvent;
    }

    public get StartEventState() {
        return this.startEventState;
    }

    public get EndEventAvailableSubUnits() {
        return this.endEventAvailableSubUnits;
    }

    public get EndEvent() {
        return this.endEvent;
    }

    public get EndEventState() {
        return this.endEventState;
    }

    public get MaxDuration() {
        return this.maxDuration;
    }
    
}