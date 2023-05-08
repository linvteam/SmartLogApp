import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogRow } from 'src/app/log.classes';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { LogManipulator } from 'src/app/LogManipulator/log-manipulator'

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent {

    rowData: LogRow[] = [];
    private logManipulator: LogManipulator;

    groupNumber = 1;

    constructor(private logManipulationService: LogManipulationService) {
        this.logManipulator = logManipulationService.getDefaultManipulator();
        this.updateView();
        this.logManipulationService.manipulatedLog.subscribe(value => {
            this.logManipulator = value;
            this.groupNumber = 1;
            this.updateView();
        });
    }

    numberOfGroups() { return this.logManipulator.getNumberOfGroups(); }

    changeGroupIndex(event: any) {
        this.groupNumber = Number((event.target as HTMLInputElement).value);
        this.updateView();
    }

    private updateView() {
        this.rowData = this.logManipulator.getGroup(this.groupNumber);
    }

    columnDefs = [
        { field: 'date', hide: true },
        { field: 'time', hide: true },
        { headerName: 'Date-Time', valueGetter: 'return data.date + " - " + data.time', field: 'DateTime', sortable: true, filter: true, width: 250 },
        { field: 'unit', sortable: true, filter: true, width: 100 },
        { field: 'subUnit', sortable: true, filter: true, width: 125 },
        { field: 'code', sortable: true, filter: true, width: 150 },
        { field: 'description', width: 355 },
        { field: 'value', width: 100 },
    ];

    defaultColDef: ColDef = {
        resizable: true
    }

    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
    }

    startDateTime() {
        return this.rowData[this.rowData.length - 1].Date + " - " + this.rowData[this.rowData.length - 1].Time;
    }

    endDateTime() {
        return this.rowData[0].Date + " - " + this.rowData[0].Time;
    }

} 
