import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogService } from 'src/app/services/log.service';
import { EventGroupingService } from "../../services/event-grouping.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  regroupTime : number;
  numberOfTables:number;
  arrayOfNumberOfTables:number[];
  constructor(private logService: LogService, private eventGroupingService: EventGroupingService) {
    this.regroupTime = 0;
    this.numberOfTables = 20;
    this.arrayOfNumberOfTables=Array(this.numberOfTables).fill(1).map((x, i) => i + 1);
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

  rowData = this.logService.getLog().Events;

  onGridReady(params : any) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
    this.eventGroupingService.currentValue.subscribe(regroupTime => this.regroupTime = regroupTime);
  }

  showTable(index : number){
    
    this.numberOfTables = this.eventGroupingService.getNumberOfRegroups(this.regroupTime);
    this.arrayOfNumberOfTables=Array(this.numberOfTables).fill(1).map((x, i) => i + 1);
    
    
    console.log(this.numberOfTables);
    
    this.rowData = this.eventGroupingService.getRegroup(index, this.regroupTime);
  }
} 
