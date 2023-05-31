import { Component } from '@angular/core';
import {ColDef, ColGroupDef} from 'ag-grid-community';
import { LogRow } from 'src/app/log.classes';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { LogManipulator } from 'src/app/LogManipulator/log-manipulator'

/**
 * Classe che definisce il comportamento della tabella di visualizzazione degli eventi
 */
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent {

    /**
     * Elenco dei dati da mostrare sulla tabella
     */
    public rowData: LogRow[] = [];

    /**
     * LogManipulator che fornisce i dati da mostrare
     */
    private logManipulator: LogManipulator;

    /**
     * Indice del gruppo di dati da visualizzare
     */
    public groupNumber: number = 1;

    /**
     * Numero totale di gruppi di dati visualizzabili
     */
    public numberOfGroups: number = 1;

    /**
     * Data e ora del primo evento nella tabella
     */
    public startDateTime: string = "";

    /**
     * Data e ora dell'ultimo evento nella tabella
     */
    public endDateTime: string = "";

    /**
     * Costruisce un nuovo componente tabella, il parametro viene passato dal dependency injector
     * @param logManipulationService Il log manipulator che fornisce gli eventi da mostrare
     */
    constructor(private logManipulationService: LogManipulationService) {
        this.logManipulator = logManipulationService.getDefaultManipulator();
        this.updateView();
        this.logManipulationService.manipulatedLog.subscribe(value => {
            this.logManipulator = value;
            this.groupNumber = 1;
            this.updateView();
        });
    }

    /**
     * Metodo che gestisce il cambio del numero di indice del gruppo da visualizzare dalla view
     * @param event i parametri dell'evento lanciato dal controllo di input
     */
    public changeGroupIndex(event: any): void {
        this.groupNumber = Number((event.target as HTMLInputElement).value);
        this.updateView();
    }

    /**
     * Aggiorna tutte le informazioni della view
     */
    private updateView(): void {
        this.rowData = this.logManipulator.getGroup(this.groupNumber);

        this.numberOfGroups = this.logManipulator.getNumberOfGroups();
        if (this.rowData.length > 0) {
            this.startDateTime = this.rowData[this.rowData.length - 1].Date + " - " + this.rowData[this.rowData.length - 1].Time;
            this.endDateTime = this.rowData[0].Date + " - " + this.rowData[0].Time;
        }
    }

    /**
     * Definizione dei campi dati da mostrare nella tabella
     */
    public columnDefs: ColDef[] = [
        { field: 'date', hide: true },
        { field: 'time', hide: true },
        { headerName: 'Date-Time', valueGetter: 'return data.date + " - " + data.time', field: 'DateTime', width: 250 },
        { field: 'unit', width: 100 },
        { field: 'subUnit', width: 125 },
        { field: 'code', width: 150 },
        { field: 'description', width: 355 },
        { field: 'value', width: 100 },
    ];

    /**
     * Impostazione di default dei campi della tabella
     */
    public defaultColDef: ColDef = {
        resizable: true, 
        sortable: true, 
        filter: true
    }

    /**
     * Metodo che gestisce l'evento gridReady emesso dalla tabella
     * @param params Parametri dell'evento 
     */
    public onGridReady(params: any): void {
        params.api.sizeColumnsToFit();
    }
} 
