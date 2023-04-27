import { Component } from '@angular/core';
import {ColDef} from 'ag-grid-community';
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
  headerDateTimes: string[];
  columnDefs: ColDef[];
  columnDefsHeader: ColDef[];
  defaultColDef: ColDef;
  defaultColDefHeader: ColDef;
  

  constructor(private logService: LogService) {
    
    const format = 'dd/MM/yyyy - HH:mm:ss';
    let pcDateToConvert = this.logService.getLog().Header.PCDate;
    let upsDateToConvert = this.logService.getLog().Header.UPSDate;
    const locale = 'it-IT';
    
    let pcDate = formatDate(pcDateToConvert, format, locale);
    let upsDate = formatDate(upsDateToConvert, format, locale)
    
    this.headerDateTimes = [];
    this.headerDateTimes.push(pcDate);
    this.headerDateTimes.push(upsDate);
    
    this.columnDefs = [
      { field: 'fileName' },
      { field: 'unit' },
      { field: 'subUnit' },
    ];

    this.columnDefsHeader = [
      { field: 'pcDateTime' },
      { field: 'upsDateTime' },
    ];
    
    this.defaultColDef ={
      sortable: true, filter: true, resizable: true, suppressSizeToFit: true
    };

    this.defaultColDefHeader ={
      sortable: true, filter: true, resizable: true, suppressSizeToFit: true
    };
    
    this.iniFiles = this.logService.getLog().Header.INIFile;
  }
  
}
