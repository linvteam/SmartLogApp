export class INIFile {

    private fileName: string;
    private unit: number;
    private subUnit: number;

    constructor(files: INIFile){
        this.fileName=files.fileName;
        this.unit=files.unit;
        this.subUnit=files.subUnit;
    }

    public get FileName() {
        return this.fileName;
    }

    public get Unit() {
        return this.unit;
    }

    public get SubUnit() {
        return this.subUnit;
    }
}

export class Header {

    private pcDate: Date;
    private upsDate: Date; 
    private iniFile: INIFile[] = [];

    constructor(header: Header){

        this.pcDate=new Date(header.pcDate);
        this.upsDate=new Date(header.upsDate);
        header.iniFile.forEach( x => this.iniFile.push(new INIFile(x)));
    }

    public get PCDate() {
        return this.pcDate;
    }

    public get UPSDate() {
        return this.upsDate;
    }

    public get INIFile() {
        return this.iniFile;
    }
  }

export class LogRow {

    private date: Date;
    private time: Date;
    private unit: number;
    private subUnit: number;
    private code: string;
    private description: string;
    private value: boolean;
    private color: string;

    constructor(row: LogRow) {
        this.date=row.date;
        this.time=row.time;
        this.unit=row.unit;
        this.subUnit=row.subUnit;
        this.code=row.code;
        this.description=row.description;
        this.value=row.value;
        this.color=row.color;
    }

    public get Date() {
        return this.date;
    }

    public get Time() {
        return this.time;
    }

    public get Unit() {
        return this.unit;
    }

    public get SubUnit() {
        return this.subUnit;
    }

    public get Code() {
        return this.code;
    }

    public get Description() {
        return this.description;
    }

    public get Value() {
        return this.value;
    }

    public get Color() {
        return this.color;
    }

    public search(searchString: RegExp): boolean {

        if (searchString.test(this.date + " - " + this.time)) return true;
        if (searchString.test(this.unit + "")) return true;
        if (searchString.test(this.subUnit + "")) return true;
        if (searchString.test(this.code)) return true;
        if (searchString.test(this.description)) return true;
        if (searchString.test(`${this.value}`)) return true;

        return false;
    }
}

export class Log {

    private header: Header;
    private events: LogRow[] = [];
    private fileName: string;

    constructor(log : Log) {
        this.header=new Header(log.header);
        this.fileName=log.fileName;
        log.events.forEach( x => this.events.push(new LogRow(x)));
    }

    public get Header() {
        return this.header;
    }

    public get Events() {
        return this.events;
    }

    public set Events(events: LogRow[]) {
        this.events = events
    }

    public get FileName() {
        return this.fileName;
    }
}