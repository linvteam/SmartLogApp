import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { LogService } from 'src/app/services/log/log.service';
import { INIFile, Log } from "../../log.classes";
import localeIT from "@angular/common/locales/it"
import { formatDate, registerLocaleData } from "@angular/common";
registerLocaleData(localeIT, "it");

/**
 * Questa classe fornisce il comportamento per il widget che mostra le informazioni del log
 */
@Component({
    selector: 'app-file-info',
    templateUrl: './file-info.component.html',
    styleUrls: ['./file-info.component.css']
})
export class FileInfoComponent {
    /**
     * Lista degli INI File del log
     */
    iniFiles: INIFile[];

    /**
     * Descrizione delle colonne della tabella degli ini file
     */
    columnDefs: ColDef[];

    /**
     * Impostazioni di default della tabella
     */
    defaultColDef: ColDef;

    /**
     * Data del pc del momento in cui il log è stato scaricato
     */
    pcDate: string;

    /**
     * Data dell'ups del momento in cui il log è stato scaricato
     */
    upsDate: string;

    /**
     * Costruisce una nuova istanza del controller di file-info
     * @param logService LogService che contiene il log di cui mostrare le informazioni
     */
    constructor(private logService: LogService) {

        const format = 'dd/MM/yyyy - HH:mm:ss';
        let pcDateToConvert = this.logService.getLog().Header.PCDate;
        let upsDateToConvert = this.logService.getLog().Header.UPSDate;
        const locale = 'it-IT';

        this.pcDate = formatDate(pcDateToConvert, format, locale);
        this.upsDate = formatDate(upsDateToConvert, format, locale)

        this.columnDefs = [
            { field: 'fileName', width: 300 },
            { field: 'unit', width: 100 },
            { field: 'subUnit', width: 124 },
        ];

        this.defaultColDef = {
            sortable: true, filter: true, resizable: true
        };

        this.iniFiles = this.logService.getLog().Header.INIFile;
    }

    /**
     * Metodo che gestisce l'evento gridReady della tabella
     * @param params Parametri dell'evento
     */
    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
    }

}
