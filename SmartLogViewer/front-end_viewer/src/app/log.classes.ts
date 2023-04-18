import { Time } from "@angular/common"

export class INIFile {
constructor(fileName: string, unit: number, subUnit: number){
    this.fileName=fileName;
    this.unit=unit;
    this.subUnit=subUnit;
}

    fileName: string;
    unit: number;
    subUnit: number;
}

export class Header {
constructor(pcDateTime: Date, upsDate: Date, iniFile: INIFile[]){
    this.pcDateTime=pcDateTime;
    this.upsDate=upsDate;
    this.iniFile=iniFile;
}

    pcDateTime: Date;
    upsDate: Date; 
    iniFile: INIFile[]
  }

export class LogRow {

    constructor(date: Date, time: Date, unit: number, subUnit: number, code: string, description: string, value: boolean, color: string) {
        this.date=date;
        this.time=time;
        this.unit=unit;
        this.subUnit=subUnit;
        this.code=code;
        this.description=description;
        this.value=value;
        this.color=color;
    }

    date: Date;
    time: Date;
    unit: number;
    subUnit: number;
    code: string;
    description: string;
    value: boolean;
    color: string
}

export class Log {

    constructor(header: Header, events: LogRow[], fileName: string) {
        this.header=header;
        this.events=events;
        this.fileName=fileName;
    }

    header: Header;
    events: LogRow[];
    fileName: string
}
