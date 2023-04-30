import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogService } from 'src/app/services/log.service';
import { LogMessageService } from 'src/app/services/log-message.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    rowData!: any[];
    constructor(private logService: LogService, private logMessageService: LogMessageService) {
        console.log('**** COSTRUTTORE ****\n')
    }

    ngOnInit() {
        this.logMessageService.currentValue.subscribe(value => this.filterEvents(value));
        this.rowData = [...this.logService.getLog().Events]
    }

  columnDefs = [
    { field: 'date', hide: true },
    { field: 'time', hide: true },
    { headerName: 'Date-Time', valueGetter: 'return data.date + " - " + data.time', field: 'DateTime', sortable: true, filter: true, width: 250},
    { field: 'unit', sortable: true, filter: true, width: 100 },
    { field: 'subUnit', sortable: true, filter: true, width: 125 },
    { field: 'code', sortable: true, filter: true, width: 150 },
    { field: 'description', width: 355 },
    { field: 'value', width: 100 },
  ];

  defaultColDef: ColDef ={
    resizable: true
    }

    public filterEvents(searchString: any): void {

        this.rowData = [...this.logService.getLog().Events]
        if (searchString == undefined || searchString == null) return;

        console.log(new RegExp(searchString))
        for (let i = 0; i < this.rowData.length; i++) {
            if (!this.rowData[i].search(new RegExp(searchString))) {
                this.rowData.splice(i, 1);
                i--;
            }

        }

        console.log('**** ARRAY LENGTH ****\n >>> %d <<<', this.rowData.length)
    }

  onGridReady(params : any) {
    params.api.sizeColumnsToFit();
  }
  
} 
