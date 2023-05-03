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
}

export class Log {

    private header: Header;
    private events: LogRow[] = [];
    private fileName: string;

    constructor(log : Log) {
        this.header=new Header(log.header);
        this.fileName=log.fileName;
        log.events.forEach( x => this.events.push(new LogRow(x)));
        
        // Ordinamento degli eventi
        this.events.sort((e1: LogRow, e2 : LogRow) => {
            let e1DateTime = (new Date([e1.Date, e1.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
            let e2DateTime = (new Date([e2.Date, e2.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
            return e1DateTime - e2DateTime;
        });
    }

    public get Header() {
        return this.header;
    }

    public get Events() {
        return this.events;
    }

    public get FileName() {
        return this.fileName;
    }
}