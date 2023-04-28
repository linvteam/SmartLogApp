import { Component } from '@angular/core';
import {ColDef, GridOptions} from 'ag-grid-community';
import { LogService } from 'src/app/services/log.service';
import {INIFile, Log} from "../../log.classes";
import localeIT from "@angular/common/locales/it"
import {formatDate, registerLocaleData} from "@angular/common";
registerLocaleData(localeIT, "it");

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.css']
})
export class FileInfoComponent {
  
  iniFiles: INIFile[];
  columnDefs: ColDef[];
  defaultColDef: ColDef;
  pcDate: string;
  upsDate: string;

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
    
    this.defaultColDef ={
      sortable: true, filter: true, resizable: true
    };
    
    this.iniFiles = this.logService.getLog().Header.INIFile;
  }

  onGridReady(params : any) {
    params.api.sizeColumnsToFit();
  }
  
}
