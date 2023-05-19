/**
 * Classe che identifica un INIFile contenuto nell'header di un log
 */
export class INIFile {

    /**
     * Nome del file INI
     */
    private fileName: string;

    /**
     * Unit associata al file INI
     */
    private unit: number;

    /**
     * SubUnit associata al file INI
     */
    private subUnit: number;

    /**
     * Costruttore di copia dell'oggetto
     * @param files Oggetto di cui si vuole fare la copia
     */
    constructor(files: INIFile) {
        this.fileName = files.fileName;
        this.unit = files.unit;
        this.subUnit = files.subUnit;
    }

    /**
     * Ottiene il nome del file INI
     */
    public get FileName(): string {
        return this.fileName;
    }

    /**
     * Ottiene la Unit associata al file INI
     */
    public get Unit(): number {
        return this.unit;
    }

    /**
     * Ottiene la SubUnit associata al file INI
     */
    public get SubUnit(): number {
        return this.subUnit;
    }
}

/**
 * Classe che contiene tutte le informazioni dell'header del log
 */
export class Header {

    /**
     * Data del pc di quando � stato scaricato il log dal macchinario
     */
    private pcDate: Date;

    /**
     * Data dell'ups di quando � stato scaricato il log dal macchinario
     */
    private upsDate: Date;

    /**
     * Lista di INI File che descrivono le componenti del macchinario
     */
    private iniFile: INIFile[] = [];

    /**
     * Costruttore di copia dell'oggetto
     * @param header Oggetto sorgente di cui effettuare la copia
     */
    constructor(header: Header) {
        this.pcDate = new Date(header.pcDate);
        this.upsDate = new Date(header.upsDate);
        header.iniFile.forEach(x => this.iniFile.push(new INIFile(x)));
    }

    /**
     * Ottiene la data del pc di quando � stato scaricato il log dal macchinario
     */
    public get PCDate() {
        return this.pcDate;
    }

    /**
     * Ottiene la data dell'ups di quando � stato scaricato il log dal macchinario
     */
    public get UPSDate() {
        return this.upsDate;
    }

    /**
     * Ottiene la lista di INI File che descrivono le componenti del macchinario
     */
    public get INIFile() {
        return this.iniFile;
    }
}

/**
 * Classe che rappresenta un record del log
 */
export class LogRow {

    /**
     * Data di registrazione del log
     */
    private date: Date;

    /**
     * Ora di registrazione del log
     */
    private time: Date;

    /**
     * Unit che ha scatenato l'evento
     */
    private unit: number;

    /**
     * SubUnit che ha scatenato l'evento
     */
    private subUnit: number;

    /**
     * Code dell'evento
     */
    private code: string;

    /**
     * Descrizione dell'evento scatenato
     */
    private description: string;

    /**
     * Valore dell'evento
     */
    private value: boolean;

    /**
     * Colore associato all'evento
     */
    private color: string;

    /**
     * Costruttore di copia dell'oggetto
     * @param row Oggetto sorgente di cui effettuare la copia
     */
    constructor(row: LogRow) {
        this.date = row.date;
        this.time = row.time;
        this.unit = row.unit;
        this.subUnit = row.subUnit;
        this.code = row.code;
        this.description = row.description;
        this.value = row.value;
        this.color = row.color;
    }

    /**
     * Ottiene la data di registrazione del log
     */
    public get Date(): Date {
        return this.date;
    }

    /**
     * Ottiene l'ora di registrazione del log
     */
    public get Time(): Date {
        return this.time;
    }

    /**
     * Ottiene la Unit che ha scatenato l'evento
     */
    public get Unit(): number {
        return this.unit;
    }

    /**
     * Ottiene la SubUnit che ha scatenato l'evento
     */
    public get SubUnit(): number {
        return this.subUnit;
    }

    /**
     * Ottiene il Code dell'evento
     */
    public get Code(): string {
        return this.code;
    }

    /**
     * Ottiene la descrizione dell'evento scatenato
     */
    public get Description(): string {
        return this.description;
    }

    /**
     * Ottiene il valore dell'evento
     */
    public get Value(): boolean {
        return this.value;
    }

    /**
     * Ottiene il colore associato all'evento
     */
    public get Color(): string {
        return this.color;
    }
}

/**
 * Classe che contiene tutte le informazioni di un log
 */
export class Log {

    /**
     * Header del log
     */
    private header: Header;

    /**
     * Eventi del log
     */
    private events: LogRow[] = [];

    /**
     * Nome del file di log
     */
    private fileName: string;

    /**
     * Costruttore di copia del Log, esegue inoltre un ordinamento degli eventi
     * @param log Oggetto sorgente da copiare
     */
    constructor(log: Log) {
        this.header = new Header(log.header);
        this.fileName = log.fileName;
        log.events.forEach(x => this.events.push(new LogRow(x)));

        // Ordinamento degli eventi
        this.events.sort((e1: LogRow, e2: LogRow) => {
            let e1DateTime: number = (new Date([e1.Date, e1.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
            let e2DateTime: number = (new Date([e2.Date, e2.Time].join('T').replaceAll("/", "-") + "Z")).getTime();
            return e2DateTime - e1DateTime;
        });
    }

    /**
     * Ottiene l'header del log
     */
    public get Header() {
        return this.header;
    }

    /**
     * Ottiene gli eventi del log
     */
    public get Events() {
        return this.events;
    }

    /**
     * Ottiene il nome del file di log
     */
    public get FileName() {
        return this.fileName;
    }
}