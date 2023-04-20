import { Component } from '@angular/core';
import {ColDef} from 'ag-grid-community';
import { Log } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(private logService: LogService) {}
  
  columnDefs = [
    { field: 'date' },
    { field: 'time' },
    { field: 'unit' },
    { field: 'subUnit' },
    { field: 'code' },
    { field: 'description' },
    { field: 'value' },
    { field: 'color' },
  ];

  defaultColDef: ColDef ={
    sortable: true, filter: true, resizable: true, suppressSizeToFit: true
  }

  rowData = this.logService.getLog().Events;

/*  rowData = [{
    "date": "2022/10/20",
    "time": "06:31:24.882",
    "unit": 1,
    "subUnit": 0,
    "code": "S003",
    "description": "Load supplied by maintenance Bypass",
    "value": true,
    "color": "0xFFE0FFFF"
  },
    {
      "date": "2022/10/20",
      "time": "06:31:23.881",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:31:23.880",
      "unit": 1,
      "subUnit": 0,
      "code": "A056",
      "description": "Maintenance ByPass Alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:31:23.880",
      "unit": 1,
      "subUnit": 0,
      "code": "S017",
      "description": "Maintenance Bypass Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:04.162",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.932",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.931",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.894",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.894",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.661",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.661",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.660",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/20",
      "time": "06:30:03.660",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/19",
      "time": "13:46:08.990",
      "unit": 1,
      "subUnit": 0,
      "code": "S009",
      "description": "In Service mode",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/19",
      "time": "13:46:07.190",
      "unit": 1,
      "subUnit": 0,
      "code": "S009",
      "description": "In Service mode",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/19",
      "time": "13:46:04.290",
      "unit": 1,
      "subUnit": 0,
      "code": "S009",
      "description": "In Service mode",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/19",
      "time": "13:46:01.890",
      "unit": 1,
      "subUnit": 0,
      "code": "S009",
      "description": "In Service mode",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:19:10.888",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:57.889",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:56.075",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:56.075",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:55.889",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:55.889",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:55.888",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:55.575",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:55.575",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/12",
      "time": "12:18:55.574",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:03:16.227",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.714",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.474",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.473",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.471",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.291",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.291",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.290",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.290",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.289",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:58.289",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:57.471",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:57.329",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:56.329",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:48.830",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:43.330",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:36.971",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:36.971",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:28.710",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:27.832",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:26.520",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:26.020",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:19.272",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:18.273",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:18.272",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:18.253",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:18.252",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:18.123",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:18.122",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:18.022",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:06.677",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/10/03",
      "time": "06:02:06.677",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.564",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.148",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.148",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.102",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.101",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.048",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.048",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.047",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:24:52.047",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:23:51.567",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:23:51.567",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.968",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.968",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.658",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.658",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.657",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.359",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.358",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/30",
      "time": "16:22:51.358",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/29",
      "time": "10:13:13.050",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/29",
      "time": "10:13:13.049",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/29",
      "time": "10:13:12.549",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/29",
      "time": "10:13:12.548",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/29",
      "time": "10:13:12.547",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:47:26.059",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:47:26.059",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:47:25.558",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:47:25.558",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:47:25.557",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:32.461",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:32.263",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:32.262",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:30.608",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:30.309",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:30.309",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:30.308",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:00.311",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:39:00.311",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:38:59.764",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:38:59.764",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:38:59.763",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:38:59.702",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:38:59.702",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:38:59.701",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:38:05.016",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:54.269",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:54.268",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:54.216",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:52.717",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:52.218",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:52.217",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:52.217",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.619",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.619",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.270",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.270",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.269",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.268",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R1",
      "description": "Input Frequency Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.010",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.010",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/28",
      "time": "09:37:26.009",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:59:08.797",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:59:03.697",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:47.799",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:46.180",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.944",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.942",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.941",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.761",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.761",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.760",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.760",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.759",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:45.759",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:44.941",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:44.799",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:43.799",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:36.299",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:30.800",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:24.441",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:24.441",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:16.177",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:15.301",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:13.990",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:13.490",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:06.743",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:05.743",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:05.742",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:05.723",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:05.722",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:05.593",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:05.592",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:58:05.492",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:57:54.143",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:57:54.143",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/26",
      "time": "05:57:54.143",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:05.271",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:05.089",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:05.089",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:04.817",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:04.817",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:04.817",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:04.816",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:04.797",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:12:04.796",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:11:04.282",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:11:04.282",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.826",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.825",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.306",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.305",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.305",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.216",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.216",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:19.216",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:10.326",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:07.326",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:07.306",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:07.305",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:05.826",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:05.626",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:05.428",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:10:05.427",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.928",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.928",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.319",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.318",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.318",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.306",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.305",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/23",
      "time": "16:09:52.305",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.584",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.478",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.477",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.476",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.395",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.394",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.394",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.276",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.275",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:32.275",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:31.476",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:31.275",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:12.277",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:30:04.639",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:29:41.579",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:49.789",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:49.788",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:41.591",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:40.651",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:39.437",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:38.937",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:32.091",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:31.090",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:31.090",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:31.070",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:31.070",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:30.940",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:30.940",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:30.840",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:19.558",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:19.558",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:19.558",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:27:19.557",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:30.128",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:30.127",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:29.798",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:26.858",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.864",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.831",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.830",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.798",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.797",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.797",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.796",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.796",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.547",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.546",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.127",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.127",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:25.126",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:24.937",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:24.937",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/22",
      "time": "13:23:24.936",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:49:03.796",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:49:00.997",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:55.245",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.642",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.641",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.639",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.558",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.558",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.557",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.439",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.439",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:54.438",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:53.639",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:53.438",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:36.940",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:29.400",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:13.236",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:08.442",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:08.441",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:48:00.244",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:59.402",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:58.090",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:57.590",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:50.744",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:49.743",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:49.743",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:49.723",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:49.723",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:49.594",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:49.593",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:49.493",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:38.210",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:38.210",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:38.210",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:47:38.210",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:11.533",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:11.396",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:11.396",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:08.464",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:08.034",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.858",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.856",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.533",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.533",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.532",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.532",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.463",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.192",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:07.192",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:06.896",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:06.896",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:06.895",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:06.683",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:06.683",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/20",
      "time": "13:46:06.682",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/12",
      "time": "16:27:53.350",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/12",
      "time": "16:27:53.349",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/12",
      "time": "16:27:52.850",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/12",
      "time": "16:27:52.849",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/12",
      "time": "16:27:52.849",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "03:26:08.166",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "03:26:08.166",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "03:26:07.665",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "03:26:07.665",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "03:26:07.664",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "02:01:57.017",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "02:01:57.017",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "02:01:56.517",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "02:01:56.517",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "02:01:56.516",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.950",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.950",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.949",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.949",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.948",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.948",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.448",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.448",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.447",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.447",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.446",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.446",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/09/07",
      "time": "01:56:31.445",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/27",
      "time": "08:59:46.270",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/27",
      "time": "08:59:46.270",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/27",
      "time": "08:59:45.770",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/27",
      "time": "08:59:45.769",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/27",
      "time": "08:59:45.769",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:48.820",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:31.357",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:31.065",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:31.064",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:31.063",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.902",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.902",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.901",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.901",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.621",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.621",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.121",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:30.063",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:29.121",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:21.421",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:16.122",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:09.563",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:09.563",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:01.349",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:09:00.423",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:59.212",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:58.712",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:51.865",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:50.865",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:50.864",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:50.845",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:50.844",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:50.715",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:50.715",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:50.614",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:40.311",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:39.315",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/22",
      "time": "06:08:39.314",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:17.214",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:17.180",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:17.179",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:17.102",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:17.101",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:16.727",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:16.726",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:16.726",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:33:16.725",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:32:16.212",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:32:16.212",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.935",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.835",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.611",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.610",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.610",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.326",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.326",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:30.325",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:21.836",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:21.611",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:18.136",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:18.111",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:16.636",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:16.436",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:16.138",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:16.137",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:07.138",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:07.137",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:06.628",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:06.628",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:06.627",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:06.612",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:06.611",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/12",
      "time": "15:31:06.611",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/07",
      "time": "00:35:45.299",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/04",
      "time": "14:58:32.072",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/04",
      "time": "07:54:50.531",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/03",
      "time": "17:08:47.659",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:25.446",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:25.446",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:24.857",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:24.857",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:24.820",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:18.858",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:18.819",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:18.444",
      "unit": 1,
      "subUnit": 0,
      "code": "S003",
      "description": "Load supplied by maintenance Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:17.446",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:17.444",
      "unit": 1,
      "subUnit": 0,
      "code": "S017",
      "description": "Maintenance Bypass Closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:52.865",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:40.867",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:21.388",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:21.089",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:21.089",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:21.088",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:20.729",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:24:13.091",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:45.748",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:37.468",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:36.610",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:36.297",
      "unit": 1,
      "subUnit": 1,
      "code": "A016",
      "description": "Battery disconnected",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:35.297",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:34.797",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:32.610",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:32.609",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:27.050",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:27.050",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:27.030",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:27.030",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:26.900",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:26.900",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:26.800",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:16.431",
      "unit": 1,
      "subUnit": 0,
      "code": "S003",
      "description": "Load supplied by maintenance Bypass",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:15.435",
      "unit": 1,
      "subUnit": 0,
      "code": "A056",
      "description": "Maintenance ByPass Alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:15.435",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:15.435",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:15.434",
      "unit": 1,
      "subUnit": 0,
      "code": "S017",
      "description": "Maintenance Bypass Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:20:15.434",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:30.576",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:30.576",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:24.109",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:24.108",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:23.500",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:23.499",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:23.499",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:04:10.578",
      "unit": 1,
      "subUnit": 1,
      "code": "A016",
      "description": "Battery disconnected",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:58.801",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:58.700",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:58.680",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:43.130",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:43.080",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:39.130",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:08.635",
      "unit": 1,
      "subUnit": 0,
      "code": "S003",
      "description": "Load supplied by maintenance Bypass",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:07.640",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:07.639",
      "unit": 1,
      "subUnit": 0,
      "code": "A056",
      "description": "Maintenance ByPass Alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:03:07.638",
      "unit": 1,
      "subUnit": 0,
      "code": "S017",
      "description": "Maintenance Bypass Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.653",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.652",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.642",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.641",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.641",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.640",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.640",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.342",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "12:01:33.341",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "00:41:32.948",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/01",
      "time": "16:57:15.577",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/25",
      "time": "14:01:41.059",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/25",
      "time": "14:01:41.059",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/25",
      "time": "14:01:41.058",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/25",
      "time": "14:01:41.058",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/25",
      "time": "05:30:48.248",
      "unit": 1,
      "subUnit": 0,
      "code": "A012",
      "description": "Maintenance alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/21",
      "time": "22:59:16.487",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/20",
      "time": "16:19:41.014",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/20",
      "time": "04:33:52.515",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "15:19:14.314",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:11.377",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:11.376",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.876",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.876",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.875",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.777",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.776",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.276",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.276",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/19",
      "time": "01:47:10.275",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/09",
      "time": "08:02:45.858",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/09",
      "time": "08:02:45.858",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/09",
      "time": "08:02:45.358",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/09",
      "time": "08:02:45.357",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/09",
      "time": "08:02:45.357",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:15.340",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.744",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.742",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.741",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.649",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.648",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.648",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.540",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.539",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:14.539",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:13.740",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:55:13.539",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:51.041",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:43.403",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:17.543",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:17.543",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:09.341",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:08.405",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:07.192",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:54:06.692",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:59.845",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:58.845",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:58.845",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:58.825",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:58.825",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:58.695",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:58.695",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:58.594",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:47.307",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:47.307",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:53:47.307",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:50:02.598",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:50:02.598",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:50:02.447",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:59.474",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.475",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.447",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.447",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.446",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.445",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.445",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.441",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.441",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.196",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:58.195",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:57.686",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:57.686",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:57.685",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:57.598",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:57.597",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:49:57.597",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.529",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.506",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.505",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.505",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.322",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.305",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.304",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.304",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.303",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:39.303",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:38.503",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:38.303",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:22.804",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:37:15.165",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:47.829",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:47.829",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:39.540",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:38.689",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:37.377",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:36.877",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:30.130",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:29.130",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:29.130",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:29.110",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:29.110",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:28.981",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:28.980",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:28.880",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:17.506",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:17.506",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:32:17.506",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:18.593",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:18.443",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:18.443",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:15.379",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.787",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.787",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.593",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.593",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.592",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.592",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.591",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.387",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.341",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:14.241",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:13.943",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:13.943",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:13.942",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:13.732",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:13.732",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:29:13.731",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.445",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.380",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.379",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.378",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.206",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.178",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.178",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.178",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.177",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:39.177",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:38.378",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:38.177",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:25.178",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:11:17.537",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:53.686",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:53.686",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:45.449",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:44.545",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:43.234",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:42.734",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:35.988",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:34.987",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:34.987",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:34.967",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:34.967",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:34.838",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:34.837",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:34.737",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:23.416",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:23.416",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:09:23.415",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:41.941",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:41.941",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:41.751",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:38.251",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:38.183",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:38.182",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:38.054",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:38.053",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:37.751",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:37.750",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:37.750",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:37.749",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:37.329",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:37.229",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:36.941",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:36.940",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:36.940",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:36.720",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:36.701",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "08:06:36.700",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.388",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.226",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.225",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.225",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.201",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.200",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.199",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.097",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.096",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:49.096",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:48.197",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:48.096",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:33.597",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:28:25.956",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:34.602",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:34.602",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:26.391",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:25.462",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:24.250",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:23.750",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:16.904",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:15.904",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:15.903",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:15.884",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:15.883",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:15.754",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:15.753",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:15.653",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:04.356",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/07",
      "time": "06:27:04.356",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:21.946",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:21.746",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:21.236",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:21.178",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:21.178",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:20.094",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:20.094",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:38:13.595",
      "unit": 1,
      "subUnit": 1,
      "code": "A016",
      "description": "Battery disconnected",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:51.234",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:51.148",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.734",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.395",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.327",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.325",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.233",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.233",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.232",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:28:47.232",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:26:47.404",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "16:10:57.456",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/06",
      "time": "00:15:37.770",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/05",
      "time": "13:41:47.059",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/05",
      "time": "01:28:49.586",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "20:38:15.995",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "20:38:15.995",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "20:38:15.994",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "20:38:15.994",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "16:14:43.010",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "16:14:43.010",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "16:14:42.510",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "16:14:42.510",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "16:14:42.509",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "09:51:38.954",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/04",
      "time": "01:16:35.740",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/03",
      "time": "13:48:07.222",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/03",
      "time": "00:45:40.950",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/02",
      "time": "13:18:37.398",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/07/02",
      "time": "00:46:16.031",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:21.585",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.985",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.984",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.983",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.902",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.901",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.901",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.783",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.782",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:20.782",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:19.982",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:19.782",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:22:07.283",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:21:59.643",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:21:42.578",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:20:48.577",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:53.801",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:53.801",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:45.594",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:44.661",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:43.450",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:42.950",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:36.103",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:35.103",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:35.102",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:35.083",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:35.082",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:34.953",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:34.953",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:34.852",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:23.560",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:23.560",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:18:23.560",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:14.183",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:14.182",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:14.023",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:12.681",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R0",
      "description": "Input Voltage Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:11.523",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.546",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.391",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.389",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.190",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.189",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.045",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.045",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.044",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:10.044",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:09.724",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:09.215",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:09.214",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:09.214",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:09.181",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:09.180",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/29",
      "time": "10:14:09.180",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/28",
      "time": "08:15:17.896",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/27",
      "time": "23:39:49.648",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/27",
      "time": "15:44:33.337",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/24",
      "time": "02:03:09.999",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/23",
      "time": "12:43:08.866",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/22",
      "time": "23:48:27.551",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/22",
      "time": "11:24:11.196",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/22",
      "time": "01:03:17.348",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/21",
      "time": "15:29:34.372",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/18",
      "time": "01:17:07.287",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/13",
      "time": "09:39:14.574",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/13",
      "time": "03:20:45.893",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/12",
      "time": "11:38:25.267",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/12",
      "time": "00:00:45.681",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/11",
      "time": "15:25:48.506",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:28:13.517",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:28:00.518",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.890",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.889",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.518",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.517",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.517",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.389",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.389",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/06/05",
      "time": "18:27:58.388",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/05/28",
      "time": "03:01:22.221",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/05/27",
      "time": "12:41:21.309",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/05/13",
      "time": "19:02:48.457",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/05/13",
      "time": "13:31:32.644",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/05/12",
      "time": "22:26:45.745",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/05/12",
      "time": "14:08:20.510",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:12.316",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:07.520",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:07.519",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:07.417",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:05.917",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:05.717",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:05.618",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:42:05.618",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.620",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.619",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.022",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.021",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.021",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.010",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.010",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "06:41:35.009",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:41:19.324",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:41:19.323",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:41:18.127",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:41:17.728",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:41:17.728",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:41:17.727",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:52.530",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:52.529",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:52.325",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:52.325",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:52.324",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:51.921",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:51.920",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/12",
      "time": "05:40:51.920",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:53.674",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:36.764",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.925",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.924",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.923",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.747",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.746",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.746",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.676",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.676",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:35.676",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:34.922",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:34.676",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:33.676",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:33.176",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:30.544",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:12:13.078",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:11:08.373",
      "unit": 1,
      "subUnit": 14,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:28.387",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:10.556",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:09.188",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.888",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.831",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.830",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.772",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.586",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.585",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.556",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.555",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.330",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.329",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.329",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:10:08.328",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:09:07.769",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:09:07.768",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.699",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.599",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.090",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.090",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.089",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.065",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.065",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/03/07",
      "time": "09:08:07.064",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:15:18.983",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:15:18.983",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:15:17.535",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:15:17.236",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:15:17.236",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:15:17.235",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:14:20.804",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:14:20.804",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:21.345",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:21.345",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:20.992",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:20.992",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:20.991",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:20.736",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:20.736",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/25",
      "time": "14:13:20.735",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/15",
      "time": "01:55:47.218",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/15",
      "time": "01:55:47.217",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/15",
      "time": "01:55:46.718",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/15",
      "time": "01:55:46.717",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/15",
      "time": "01:55:46.717",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:04:35.541",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:04:35.540",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:04:33.844",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:04:33.544",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:04:33.345",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:04:33.344",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:03:50.534",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:03:50.534",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.853",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.852",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.549",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.548",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.548",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.344",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.343",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/09",
      "time": "10:02:50.343",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:15.342",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:09.843",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:09.717",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:09.669",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:09.669",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:08.343",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:08.043",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:07.944",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:15:07.944",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.946",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.946",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.671",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.671",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.670",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.437",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.436",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:14:37.436",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:35.771",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:31.696",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:31.695",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:31.372",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:29.772",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:29.573",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:29.572",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:29.572",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:04.174",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:04.074",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:03.697",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:03.697",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:03.696",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:03.565",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:03.565",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:09:03.564",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:08:33.168",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:08:33.168",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:08:32.668",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:08:32.667",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/02/01",
      "time": "03:08:32.667",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:22.268",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.779",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.515",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.514",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.513",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.331",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.331",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.330",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.330",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.329",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:04.329",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:03.511",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:03.369",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:13:02.369",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:54.869",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:49.370",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:43.011",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:43.011",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:34.776",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:33.871",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:32.560",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:32.060",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:25.313",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:24.313",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:24.312",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:24.293",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:24.292",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:24.163",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:24.163",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:24.062",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:12.743",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/21",
      "time": "07:12:12.742",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.975",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.558",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.557",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.512",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.511",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.511",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.510",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.486",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:57:12.486",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:56:11.974",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:56:11.974",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:12.671",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:12.471",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:11.996",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:11.996",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:11.995",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:11.963",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:11.962",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/20",
      "time": "17:55:11.961",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:53.042",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.525",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.288",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.287",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.286",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.106",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.106",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.105",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.105",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.104",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:35.104",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:34.286",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:34.144",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:33.144",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:25.644",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:20.145",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:13.786",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:13.786",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:05.520",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:04.646",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:03.335",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:46:02.835",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:56.088",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:55.088",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:55.087",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:55.068",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:55.067",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:54.938",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:54.937",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:54.837",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:43.487",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:45:43.487",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.455",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.228",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.227",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.165",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.164",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.013",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.012",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.012",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:42:59.011",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:41:58.456",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:41:58.456",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.802",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.802",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.237",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.237",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.236",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.193",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.193",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/13",
      "time": "16:40:58.192",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:52.314",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:52.313",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:51.814",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:51.813",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:51.813",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:50.914",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:50.914",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:50.414",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:50.414",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "20:39:50.413",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:45:14.354",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:45:02.355",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:45:00.779",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:45:00.479",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:45:00.379",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:45:00.378",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.879",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.779",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.671",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.670",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.670",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.669",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.355",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.355",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.354",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.170",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.169",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/01/05",
      "time": "11:44:59.169",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:25.075",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.586",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.322",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.321",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.320",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.139",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.138",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.138",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.137",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.137",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:07.136",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:06.319",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:06.176",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:25:05.176",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:57.677",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:52.177",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:45.819",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:45.818",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:37.582",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:36.678",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:35.367",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:34.867",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:28.121",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:27.120",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:27.120",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:27.100",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:27.100",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:26.970",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:26.970",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:26.869",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:15.548",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "07:24:15.548",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.837",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.406",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.405",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.394",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.393",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.368",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.367",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.367",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:10:15.366",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:09:14.839",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:09:14.839",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:15.377",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:15.277",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:14.904",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:14.903",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:14.903",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:14.668",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:14.668",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/22",
      "time": "06:08:14.667",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:50.006",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:50.005",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:48.639",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:48.440",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:48.439",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:48.439",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:22.542",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:22.541",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:22.007",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:22.007",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:22.006",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:21.933",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:21.932",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:22:21.931",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:11.513",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:10.848",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:04.648",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:04.513",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:03.148",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:02.948",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:02.749",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:21:02.749",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.749",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.749",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.514",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.513",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.513",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.140",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.140",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/12",
      "time": "06:20:56.139",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:38.326",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:31.627",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:31.420",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:31.419",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:30.127",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:29.928",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:29.829",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:35:29.828",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.831",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.830",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.422",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.421",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.421",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.321",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.321",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:34:59.320",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:58.240",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:50.433",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:50.433",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:49.932",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:49.932",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:49.931",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:45.141",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:43.642",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:43.342",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:43.342",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:42.432",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:42.432",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:42.342",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:41.833",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:41.833",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:41.832",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:41.642",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:41.542",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:41.542",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:41.042",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:16.444",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:15.744",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:15.434",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:15.433",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:15.433",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:15.235",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:15.235",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/03",
      "time": "13:32:15.234",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:14.081",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:09.117",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:09.116",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:08.882",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:07.482",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:07.182",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:06.882",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:57:06.882",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:19.201",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:19.201",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.886",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.786",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.621",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.620",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.619",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.278",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.277",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:56:14.277",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:41:48.194",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:41:48.193",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:41:46.962",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:41:46.662",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:41:46.363",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:41:46.363",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.867",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.866",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.258",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.258",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.257",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.198",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.197",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "05:40:51.196",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:16.835",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:12.962",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:12.961",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:12.835",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:12.429",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:11.335",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:11.036",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:11.036",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:49:11.035",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:41.038",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:41.038",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:40.463",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:40.463",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:40.462",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:40.430",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:40.429",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:48:40.429",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:35.154",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:32.978",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:32.978",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:32.754",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:31.254",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:31.055",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:31.055",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:31.054",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:05.149",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:05.148",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:05.148",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:05.147",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:05.147",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.757",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.756",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.480",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.479",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.479",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.148",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.147",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/11/02",
      "time": "04:45:04.147",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:33.831",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:20.832",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.930",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.930",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.832",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.832",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.831",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.430",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.430",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/30",
      "time": "08:33:18.429",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:33:06.064",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:55.714",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:55.714",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:55.214",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:55.213",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:55.213",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:53.065",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:51.214",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:51.214",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:51.065",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:51.065",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:51.064",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:50.714",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:50.714",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "21:32:50.713",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:17.371",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:04.372",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.896",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.896",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.396",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.395",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.395",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.372",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.371",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/21",
      "time": "09:14:02.371",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:54.447",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:41.448",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.753",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.753",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.448",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.447",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.447",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.253",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.252",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/05",
      "time": "00:00:39.252",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:53.787",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:49.293",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:49.292",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:49.188",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:47.688",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:47.488",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:47.389",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:47.389",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:17.391",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:17.391",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:16.882",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:16.881",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:16.881",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:16.795",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:16.794",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:44:16.793",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:46.847",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:29.326",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:29.094",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:29.093",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:29.092",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:28.911",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:28.910",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:28.910",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:28.909",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:28.909",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:28.908",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:28.090",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:27.948",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:26.948",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:19.449",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:13.950",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:07.591",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:14:07.590",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:59.323",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:58.450",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:57.139",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:56.639",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:49.893",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:48.892",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:48.892",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:48.872",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:48.872",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:48.742",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:48.742",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:48.642",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:37.289",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "11:13:37.288",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:53.007",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.856",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.855",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.759",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.758",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.590",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.590",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.589",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:30:52.589",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:29:52.016",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:29:52.016",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.950",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.949",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.441",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.440",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.440",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.366",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.366",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:51.365",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:41.150",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "10:28:38.951",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:45.214",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:45.213",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:43.725",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:43.426",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:43.425",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:43.425",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:18.027",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:17.927",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:17.715",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:17.715",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:17.714",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:17.419",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:17.418",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/10/02",
      "time": "06:08:17.418",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:36.367",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:29.632",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:24.532",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:23.368",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.524",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.524",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.368",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.368",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.367",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.024",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.023",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/27",
      "time": "08:06:21.023",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:17.476",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:15.230",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:04.731",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:04.477",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.723",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.722",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.477",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.476",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.476",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.222",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.222",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/21",
      "time": "08:38:02.221",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:42.467",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.974",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.714",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.712",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.712",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.531",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.530",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.530",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.529",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.529",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:24.528",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:23.710",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:23.568",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:22.568",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:15.069",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:09.570",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:03.210",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:31:03.210",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:54.973",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:54.070",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:52.759",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:52.259",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:45.513",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:44.512",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:44.512",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:44.492",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:44.492",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:44.362",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:44.362",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:44.262",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:32.940",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/20",
      "time": "06:30:32.940",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.885",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.650",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.650",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.452",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.451",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.411",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.410",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.410",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:27:33.409",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:26:32.892",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:26:32.892",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.940",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.840",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.661",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.660",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.660",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.332",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.331",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/17",
      "time": "16:25:32.331",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:19.830",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:07.831",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:06.211",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:06.012",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:06.011",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:06.011",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:05.011",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:05.011",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:04.831",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:04.831",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:04.830",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:04.502",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:04.502",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/16",
      "time": "10:03:04.501",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:21.057",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:09.558",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:08.137",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:08.136",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:07.636",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:07.636",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:07.635",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:06.236",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:06.236",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:06.059",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:06.058",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:06.058",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:05.736",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:05.736",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/11",
      "time": "08:35:05.735",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:46.719",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:44.258",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:44.258",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:44.220",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:42.720",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:42.420",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:42.221",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:42.221",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.723",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.722",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.260",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.259",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.259",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.213",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.213",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:50:15.212",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:48.261",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:42.762",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:41.425",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:41.225",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:40.827",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:40.826",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.826",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.826",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.263",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.262",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.261",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.217",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.217",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/09/10",
      "time": "06:49:33.216",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/30",
      "time": "06:12:02.917",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/30",
      "time": "06:11:59.317",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/30",
      "time": "06:11:57.310",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/30",
      "time": "06:11:57.310",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/30",
      "time": "06:11:57.310",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/30",
      "time": "06:11:57.309",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:37:00.195",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:50.195",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:48.230",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:48.230",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:47.730",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:47.730",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:47.729",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:47.696",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:47.695",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:47.695",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:46.031",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:46.030",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:45.195",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:45.194",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:45.194",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:45.030",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:45.030",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/28",
      "time": "08:36:45.029",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:43.571",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:30.572",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:29.044",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:29.044",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:28.573",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:28.572",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:28.572",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:28.543",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:28.543",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:28.542",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:16:06.574",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:53.575",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.747",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.746",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.575",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.574",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.574",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.246",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.246",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/21",
      "time": "06:15:51.245",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:40:10.258",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:57.259",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:55.469",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:55.469",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:55.259",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:55.258",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:55.258",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:54.968",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:54.968",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/18",
      "time": "13:39:54.967",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/17",
      "time": "03:34:50.607",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/11",
      "time": "11:16:31.775",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/11",
      "time": "01:33:34.824",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/10",
      "time": "12:46:27.601",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/10",
      "time": "00:40:43.153",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/09",
      "time": "13:32:08.569",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/09",
      "time": "01:05:49.210",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/08",
      "time": "12:32:42.948",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/07",
      "time": "01:28:58.401",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/06",
      "time": "11:47:04.340",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/05",
      "time": "23:57:30.823",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/05",
      "time": "11:15:22.567",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:30:11.260",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:59.261",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:57.830",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:57.630",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:57.430",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:57.430",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:56.430",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:56.330",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:56.261",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:56.260",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:56.260",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:55.822",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:55.821",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/02",
      "time": "07:29:55.821",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/08/01",
      "time": "14:30:09.949",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/30",
      "time": "16:10:06.994",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:30.986",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:18.487",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:17.144",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:16.944",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:16.645",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:16.645",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:16.144",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:16.144",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:15.987",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:15.987",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:15.986",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:15.635",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:15.635",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "11:16:15.634",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/27",
      "time": "05:12:19.394",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/23",
      "time": "13:16:20.487",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/22",
      "time": "23:31:11.412",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/22",
      "time": "20:47:11.257",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/22",
      "time": "20:47:11.257",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/22",
      "time": "20:47:10.757",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/22",
      "time": "20:47:10.757",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/22",
      "time": "20:47:10.756",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/21",
      "time": "11:20:57.257",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "21:06:33.533",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "21:06:29.034",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "21:06:26.026",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "21:06:25.526",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "21:06:25.025",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "21:06:25.025",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "21:06:25.024",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:31.489",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:25.607",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:18.707",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:18.489",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.799",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.799",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.490",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.489",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.489",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.299",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.298",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "12:44:16.298",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:17.804",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:15.704",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:15.539",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:15.538",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:14.204",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:14.005",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:14.004",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:27:14.004",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:51.006",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:50.906",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:50.540",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:50.540",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:50.539",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:50.297",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:50.297",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:50.296",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:26.042",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:24.042",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:22.609",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:22.409",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:22.210",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:22.210",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:11.210",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:11.210",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:11.043",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:11.042",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:11.042",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:10.601",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:10.601",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/13",
      "time": "06:26:10.600",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/10",
      "time": "05:50:49.983",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/10",
      "time": "05:50:49.982",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/10",
      "time": "05:50:49.483",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/10",
      "time": "05:50:49.482",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/10",
      "time": "05:50:49.482",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:54:19.316",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:30.379",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:17.880",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.869",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.869",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.381",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.380",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.380",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.369",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.368",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:30:15.368",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:28:32.878",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:28:32.878",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:28:32.378",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:28:32.377",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:28:32.377",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:52.230",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:50.431",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:38.731",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:38.432",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:36.931",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:36.631",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:36.331",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:36.331",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.831",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.731",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.432",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.432",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.431",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.122",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.122",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:20:35.121",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:18:54.132",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:18:54.131",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:18:53.632",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:18:53.631",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "19:18:53.631",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:14.907",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:14.907",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:14.407",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:14.407",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:14.406",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:13.407",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:13.407",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:12.907",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:12.907",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "18:12:12.906",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/07/08",
      "time": "09:47:48.544",
      "unit": 1,
      "subUnit": 0,
      "code": "A020",
      "description": "Battery Temperature alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:48.535",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:31.004",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.780",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.779",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.778",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.598",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.598",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.597",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.597",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.596",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:30.596",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:29.778",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:29.636",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:28.636",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:21.061",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:15.637",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:09.278",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:09.278",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:00.999",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:28:00.062",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:58.827",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:58.327",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:51.580",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:50.580",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:50.580",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:50.560",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:50.560",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:50.430",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:50.430",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:50.329",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:38.965",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/23",
      "time": "06:27:38.965",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.607",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.564",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.563",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.514",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.513",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.126",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.126",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.125",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:07:46.125",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:06:45.618",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:06:45.618",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:45.196",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:45.196",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:45.024",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:45.023",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:45.023",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:44.687",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:44.686",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/22",
      "time": "16:05:44.686",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:21.626",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:06.912",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:06.882",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:06.882",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:06.628",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:05.128",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:04.928",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:04.828",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:18:04.828",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:36.330",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:36.130",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:35.522",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:35.521",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:35.521",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.722",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.721",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.384",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.384",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.383",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.222",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.221",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:17:34.221",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:33.436",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:30.889",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:30.888",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:30.736",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:29.236",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:29.036",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:28.937",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:28.936",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.938",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.838",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.390",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.390",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.389",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.230",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.229",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "22:16:03.229",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:33.353",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:30.501",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:30.500",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:30.354",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:28.754",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:28.555",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:28.554",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:54:28.554",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:35.059",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:35.058",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:34.505",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:34.504",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:34.504",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:34.450",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:34.449",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:53:34.449",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:37.582",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:35.125",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:35.124",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:34.782",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:33.282",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:33.082",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:32.983",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:30:32.983",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:59.063",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:59.063",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.987",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.986",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.628",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.628",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.627",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.377",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.377",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:29:47.376",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:41.930",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:36.670",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:36.669",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:36.430",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:34.930",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:34.731",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:34.730",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:21:34.730",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.735",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.734",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.173",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.173",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.172",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.125",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.125",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "21:20:47.124",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "20:36:21.773",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2021/06/18",
      "time": "20:36:13.907",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/10",
      "time": "14:07:27.089",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/10",
      "time": "14:07:27.089",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/10",
      "time": "14:07:27.088",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:40.335",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:26.836",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:25.388",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:25.388",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:25.335",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:25.335",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:25.333",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R0",
      "description": "Input Voltage Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:24.888",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:24.888",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/03",
      "time": "09:38:24.887",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:36.989",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:30.410",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:24.710",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:24.489",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:23.110",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:22.911",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:22.712",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:22.712",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:22.211",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:22.211",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:21.989",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:21.989",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:21.988",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:21.602",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:21.602",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/02",
      "time": "01:06:21.601",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:21.678",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:09.679",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:08.063",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:07.863",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:07.564",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:07.564",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:07.063",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:07.063",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:06.679",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:06.678",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:06.678",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:06.554",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:06.553",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/11/01",
      "time": "11:42:06.553",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.964",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.398",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.397",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.396",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.202",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.195",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.194",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.194",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.193",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:19.193",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:18.394",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:18.193",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:31:03.194",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:30:55.554",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:28:03.209",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:28:03.209",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:54.968",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:54.069",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:52.758",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:52.258",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:45.511",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:44.511",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:44.510",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:44.491",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:44.490",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:44.361",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:44.361",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:44.260",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:32.935",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:32.935",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:27:32.935",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:28.420",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:28.410",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:28.409",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.920",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.859",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.859",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.676",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.675",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.420",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.419",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.419",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.418",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.189",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:24.088",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:23.910",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:23.909",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:23.909",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:23.580",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:23.579",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/30",
      "time": "13:26:23.579",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:07.334",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.791",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.789",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.788",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.594",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.587",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.586",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.586",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.585",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:06.585",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:05.786",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:02:05.585",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:01:43.087",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "11:01:35.371",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:54.659",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:54.659",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:46.373",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:45.443",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:44.207",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:43.708",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:36.961",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:35.961",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:35.960",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:35.941",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:35.940",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:35.811",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:35.810",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:35.710",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:24.339",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:24.339",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:47:24.339",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:50.349",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:50.348",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:50.251",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.558",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.557",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.267",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.265",
      "unit": 1,
      "subUnit": 0,
      "code": "A059",
      "description": "UPS Power OFF",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.252",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.251",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.251",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.250",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:46.249",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.900",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.899",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.391",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.390",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.390",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.349",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.348",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "10:44:45.347",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:44.700",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:27.173",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.948",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.947",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.946",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.842",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.822",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.764",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.764",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.763",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.763",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.762",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:26.762",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:25.945",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:25.802",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:24.802",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:17.227",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:11.803",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:05.444",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:16:05.444",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:57.170",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:56.229",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:54.993",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:54.493",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:47.746",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:46.746",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:46.745",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:46.726",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:46.725",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:46.596",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:46.596",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:46.495",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:35.137",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/13",
      "time": "06:15:35.136",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:51.087",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:51.079",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:51.078",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:50.643",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:50.642",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:50.642",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:50.641",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:50.594",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:12:50.594",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:11:50.091",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:11:50.091",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:50.492",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:50.092",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:49.604",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:49.604",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:49.603",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:49.583",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:49.583",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/12",
      "time": "16:10:49.582",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:56.994",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.476",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.240",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.240",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.238",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.059",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.058",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.057",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.057",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.057",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:39.056",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:38.238",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:38.096",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:37.096",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:29.596",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:24.097",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:17.739",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:17.738",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:09.475",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:08.598",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:07.287",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:06.787",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:40:00.041",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:59.040",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:59.040",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:59.020",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:59.020",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:58.890",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:58.890",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:58.790",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:47.442",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/07",
      "time": "05:39:47.442",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:53.343",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:47.044",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:47.043",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.911",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.534",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.533",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.500",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.500",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.474",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.474",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:46.473",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.914",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.914",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.763",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.762",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.502",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.501",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.501",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.500",
      "unit": 1,
      "subUnit": 1,
      "code": "A032",
      "description": "Rectifier critical Alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.344",
      "unit": 1,
      "subUnit": 14,
      "code": "ES056",
      "description": "Request to go to on Bypass due to Overload or Slow discharge (Inverter/Boost)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.316",
      "unit": 1,
      "subUnit": 14,
      "code": "ES056",
      "description": "Request to go to on Bypass due to Overload or Slow discharge (Inverter/Boost)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.316",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.315",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.315",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:33.314",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:32.913",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:31.945",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:31.745",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:31.646",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:11:31.646",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.650",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.650",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.506",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.505",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.504",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.142",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.141",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/06",
      "time": "16:10:32.141",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:51.304",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:30.906",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:30.881",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:30.880",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:29.406",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:29.206",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:28.907",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:54:28.907",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:52.410",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:52.409",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:51.883",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:51.882",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:51.882",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:51.801",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:51.800",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/05",
      "time": "11:53:51.800",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:15:02.590",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:50.591",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:48.984",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:48.684",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:48.485",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:48.485",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.984",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.984",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.591",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.591",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.590",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.375",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.375",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:14:47.374",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:27.103",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:15.103",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:13.389",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:13.388",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.889",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.888",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.888",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.489",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.488",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.104",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.103",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:12.103",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:11.989",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:11.989",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/10/03",
      "time": "09:12:11.988",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:59:12.616",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:59.617",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.680",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.680",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.617",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.616",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.616",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.180",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.180",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:58:57.179",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:26:06.258",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:26:06.258",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:26:05.758",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:26:05.758",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/27",
      "time": "02:26:05.757",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:26.716",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:22.944",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:14.716",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:14.645",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:13.145",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:12.946",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:12.946",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:12.945",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.946",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.945",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.717",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.716",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.715",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.436",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.436",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:49:11.435",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:44:28.863",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:44:28.862",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:44:28.362",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:44:28.361",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/25",
      "time": "12:44:28.361",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:39.534",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:33.434",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:33.158",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:33.158",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:31.934",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:31.735",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:31.735",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:31.734",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:01.237",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:01.237",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:00.660",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:00.660",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:00.659",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:00.628",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:00.628",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "09:25:00.627",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:19:11.131",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:19:11.130",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:19:09.728",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:19:09.528",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:19:09.328",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:19:09.328",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.830",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.730",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.632",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.632",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.631",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.221",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.220",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:18:49.220",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:19.196",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.611",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.442",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.441",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.440",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.260",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.260",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.259",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.259",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.258",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:01.258",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:00.440",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:06:00.398",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:59.398",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:51.699",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:46.399",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:39.840",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:39.840",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:31.611",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:30.700",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:29.389",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:28.889",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:22.142",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:21.142",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:21.141",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:21.122",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:21.121",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:20.992",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:20.992",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:20.891",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:09.578",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:05:09.578",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.878",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.562",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.561",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.533",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.532",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.427",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.427",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.426",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:03:00.426",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:01:59.881",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:01:59.881",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:01:00.247",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:01:00.246",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:01:00.043",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:01:00.042",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:01:00.042",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:00:59.738",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:00:59.737",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "06:00:59.737",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:56.868",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:54.169",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:54.063",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:54.063",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:52.669",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:52.469",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:52.469",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:52.469",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:10.898",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:56:10.897",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.978",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.978",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.571",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.571",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.570",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.369",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.368",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/19",
      "time": "05:55:10.368",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/13",
      "time": "21:32:01.123",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/13",
      "time": "21:32:01.122",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/13",
      "time": "21:32:00.623",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/13",
      "time": "21:32:00.622",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/13",
      "time": "21:32:00.622",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:33:14.168",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:33:01.169",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.542",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.541",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.169",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.168",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.168",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.041",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.041",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:59.040",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:17.146",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:17.146",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:16.645",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:16.645",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:32:16.644",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:50.674",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:37.675",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:36.049",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:36.049",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:35.675",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:35.675",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:35.674",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:35.549",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:35.548",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:31:35.548",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:53.053",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:53.052",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:52.553",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:52.552",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:52.552",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:43.354",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:43.353",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:42.854",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:42.853",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:42.853",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:38.763",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:33.663",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:31.656",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:31.655",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:31.155",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:31.155",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:30:31.154",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:29:45.559",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:29:45.558",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:29:45.059",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:29:45.058",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:29:45.058",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:47.189",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:47.161",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:44.973",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:35.474",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:34.190",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:32.465",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:32.465",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:32.190",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:32.190",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:32.189",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:31.965",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:31.965",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:31.964",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:01.192",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:28:01.191",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:59.268",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:59.268",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:58.768",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:58.768",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:58.767",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:58.691",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:58.690",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:47.691",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.869",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.869",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.691",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.691",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.690",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.369",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.369",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:27:45.368",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:26:33.476",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:26:33.476",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:26:32.976",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:26:32.975",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:26:32.975",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:32.744",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:19.745",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:18.026",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:18.025",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:17.745",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:17.745",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:17.744",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:17.525",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:17.525",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:17:17.524",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:59.746",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:49.747",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:47.828",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:47.828",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:47.747",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:47.746",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:47.328",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:47.328",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:47.327",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:46.746",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.930",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.929",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.746",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.746",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.745",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.429",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.428",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:16:44.428",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:47.303",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:47.233",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:34.304",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.589",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.588",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.304",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.304",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.303",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.089",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.088",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:05:32.088",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:38.308",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:25.309",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:23.495",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:23.494",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:23.309",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:23.309",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:23.308",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:22.995",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:22.994",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:22.994",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:04:06.810",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:53.811",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:52.199",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:52.198",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:51.811",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:51.811",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:51.810",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:51.698",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:51.697",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:51.697",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:14.810",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:03:12.314",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:59.911",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:59.315",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.703",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.702",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.315",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.314",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.314",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.202",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.202",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/09/07",
      "time": "02:02:57.201",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:13.951",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:07.394",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:02.952",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:02.895",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:00.986",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:00.986",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:00.486",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:00.485",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:23:00.485",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:59.486",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:59.486",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:58.986",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:58.986",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:58.985",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:58.953",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:58.952",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/31",
      "time": "09:22:58.952",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:07:04.241",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:51.742",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:50.569",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:50.269",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:50.070",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:50.069",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:49.569",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:49.569",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:49.243",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:49.242",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:49.242",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:48.960",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:48.960",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "06:06:48.959",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:53.933",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:43.433",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:41.996",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:41.697",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:41.697",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:41.696",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:40.796",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:40.696",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:40.188",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:40.187",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:40.187",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:39.288",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:39.287",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:38.934",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:38.933",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:38.933",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:38.788",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:38.787",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/30",
      "time": "00:50:38.787",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:16:11.085",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:16:02.873",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:59.086",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:58.873",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:57.373",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:57.073",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:56.975",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:56.974",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:56.474",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:56.473",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:56.086",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:56.086",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:56.085",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:55.864",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:55.864",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "21:15:55.863",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:57:50.977",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:57:50.977",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:57:50.477",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:57:50.477",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:57:50.476",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:30.056",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:17.057",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:15.168",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:15.168",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:15.057",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:15.056",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:15.056",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:14.668",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:14.668",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "16:41:14.667",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:59:46.528",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:59:46.527",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:59:46.027",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:59:46.027",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:59:46.027",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:49:05.660",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:52.661",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.689",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.688",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.661",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.661",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.660",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.188",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.187",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:50.187",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:11.091",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:11.091",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:10.591",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:10.591",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "14:48:10.590",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:25.756",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:25.756",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:24.147",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:23.947",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:23.847",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:23.847",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.849",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.749",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.258",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.257",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.257",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.240",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.240",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:45:00.239",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:42:03.773",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:42:02.773",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:42:01.465",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:42:01.265",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:42:00.967",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:42:00.967",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.967",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.967",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.774",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.773",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.773",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.358",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.357",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "06:41:48.357",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:53.286",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:50.687",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:50.684",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:50.683",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:49.187",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:48.987",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:48.888",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:48.888",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.890",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.890",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.685",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.685",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.685",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.281",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.280",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "05:24:18.280",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:47.979",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:42.870",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:42.869",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:42.779",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:41.179",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:40.979",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:40.780",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:40.780",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.782",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.781",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.371",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.371",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.370",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.172",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.172",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/29",
      "time": "04:49:15.171",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:48.890",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:35.191",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:32.991",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:31.332",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:31.135",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:31.134",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:31.133",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.954",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.953",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.953",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.952",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.952",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.951",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.133",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:30.091",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:29.091",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:21.413",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:16.093",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:09.534",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:09.533",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:01.326",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:44:00.414",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:59.182",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:58.682",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:51.835",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:50.835",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:50.835",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:50.815",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:50.815",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:50.685",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:50.685",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:50.585",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:39.291",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:43:39.290",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.751",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.644",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.643",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.600",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.600",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.289",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.288",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.288",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:37:18.287",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:36:17.752",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:36:17.752",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:18.138",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:18.038",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:17.611",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:17.610",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:17.610",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:17.530",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:17.529",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/26",
      "time": "06:35:17.529",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/24",
      "time": "21:30:39.043",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/24",
      "time": "21:30:39.042",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/24",
      "time": "21:30:38.542",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/24",
      "time": "21:30:38.542",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/24",
      "time": "21:30:38.542",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:30:48.511",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:30:48.511",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:30:48.011",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:30:48.011",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:30:48.010",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:24.940",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:12.941",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:11.267",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:10.967",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:10.768",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:10.768",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:10.267",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:10.267",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:09.941",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:09.941",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:09.940",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:09.660",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:09.659",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:22:09.658",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:01:03.175",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:01:03.174",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:01:02.674",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:01:02.674",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:01:02.673",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:00:57.275",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:00:57.275",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:00:56.775",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:00:56.774",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/23",
      "time": "16:00:56.774",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:55:18.690",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:55:18.690",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:55:17.211",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:55:17.011",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:55:16.912",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:55:16.912",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.916",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.915",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.693",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.693",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.692",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.407",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.406",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "20:54:31.406",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:41.764",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:38.730",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:38.730",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:38.665",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:37.165",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:36.866",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:36.865",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:14:36.865",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:43.370",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:43.370",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:43.235",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:43.234",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:43.233",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:42.861",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:42.861",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "19:13:42.860",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:16.045",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:16.045",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:14.700",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:14.699",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:14.488",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:14.189",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:14.090",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:16:14.089",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:44.092",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:44.091",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:43.582",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:43.582",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:43.581",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:43.547",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:43.547",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:15:43.546",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:22.910",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:20.065",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:20.064",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:20.010",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:18.510",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:18.210",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:18.003",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:12:18.002",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:52.505",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:52.504",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:52.504",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:52.503",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:52.503",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:52.013",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:52.013",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:51.566",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:51.566",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:51.565",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:51.504",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:51.504",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/16",
      "time": "18:11:51.503",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:36.296",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:23.297",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.691",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.690",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.297",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.296",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.296",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.190",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.189",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:21.189",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:19.296",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:05.797",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:04.297",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:04.297",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:27:04.297",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R3",
      "description": "Input Phase Configuration not OK (monophase)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:59.330",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:46.331",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.626",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.626",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.331",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.330",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.330",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.126",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.126",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/14",
      "time": "12:20:44.125",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:53.656",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:40.657",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.804",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.804",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.657",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.656",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.656",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.304",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.303",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/12",
      "time": "10:11:38.303",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:39.787",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:22.206",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:22.033",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:22.031",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:22.031",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:21.850",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:21.849",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:21.849",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:21.790",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:21.789",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:21.789",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:21.030",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:20.789",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:19.789",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:12.290",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:06.790",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B00",
      "description": "Inv. not Ready",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:00.431",
      "unit": 1,
      "subUnit": 14,
      "code": "ES014",
      "description": "Ready To send Inverter command",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:02:00.431",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:52.200",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:51.291",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:49.980",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:49.480",
      "unit": 1,
      "subUnit": 1,
      "code": "EC_R31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:42.733",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:41.733",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:41.732",
      "unit": 1,
      "subUnit": 14,
      "code": "ES005",
      "description": "Inverter Module 1 present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:41.713",
      "unit": 1,
      "subUnit": 14,
      "code": "ES085",
      "description": "Auxiliary Mains Phase Rotation is OK between Units in parallel",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:41.712",
      "unit": 1,
      "subUnit": 14,
      "code": "ES058",
      "description": "Inverter is Absent",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:41.583",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:41.583",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:41.482",
      "unit": 1,
      "subUnit": 14,
      "code": "EC31",
      "description": "Send Sub Unit Operational",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:30.167",
      "unit": 1,
      "subUnit": 0,
      "code": "A005",
      "description": "Insufficient resources",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "09:01:30.167",
      "unit": 1,
      "subUnit": 0,
      "code": "S016",
      "description": "Output Breaker Closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.528",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.525",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.524",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.464",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.345",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.344",
      "unit": 1,
      "subUnit": 14,
      "code": "ES046",
      "description": "Inverter Availabe/Ready to supply the load",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.344",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.295",
      "unit": 1,
      "subUnit": 1,
      "code": "S049",
      "description": "Rectifier ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:56:36.294",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:55:35.529",
      "unit": 1,
      "subUnit": 0,
      "code": "A027",
      "description": "Battery alarm",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:55:35.529",
      "unit": 1,
      "subUnit": 0,
      "code": "A000",
      "description": "Imminent Stop",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:36.355",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.755",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.534",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.532",
      "unit": 1,
      "subUnit": 1,
      "code": "S052",
      "description": "Inverter ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.530",
      "unit": 1,
      "subUnit": 1,
      "code": "EA11_I0",
      "description": "Inverter Out Of Mask",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.305",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.304",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.304",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.245",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.215",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.199",
      "unit": 1,
      "subUnit": 14,
      "code": "ES023",
      "description": "Output voltage present (Vrms >= 165V AND 40Hz >= Fout <= 70Hz)",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.198",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.198",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.197",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.197",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.196",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.196",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.195",
      "unit": 1,
      "subUnit": 14,
      "code": "ES070",
      "description": "Output voltage is out of mask",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/03",
      "time": "08:54:35.195",
      "unit": 1,
      "subUnit": 14,
      "code": "ES070",
      "description": "Output voltage is out of mask",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "10:32:56.652",
      "unit": 1,
      "subUnit": 1,
      "code": "EA08_R5",
      "description": "Over Current Pin Active",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:45.220",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:32.721",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:31.387",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:31.187",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:30.889",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:30.889",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:30.388",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:30.388",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:30.221",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:30.221",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:30.220",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:29.879",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:29.879",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:45:29.878",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:42.741",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:30.242",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:28.910",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:28.710",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:28.411",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:28.411",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.911",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.910",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B00",
      "description": "Aux Mains Out of Tolerance",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.743",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.742",
      "unit": 1,
      "subUnit": 1,
      "code": "A035",
      "description": "Rectifier input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.742",
      "unit": 1,
      "subUnit": 1,
      "code": "EA09_R2",
      "description": "Input Masks Not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.402",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.401",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/02",
      "time": "02:41:27.401",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/01",
      "time": "23:04:00.724",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/01",
      "time": "23:04:00.724",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/01",
      "time": "23:04:00.224",
      "unit": 1,
      "subUnit": 14,
      "code": "A050",
      "description": "Bypass Input supply not OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/01",
      "time": "23:04:00.224",
      "unit": 1,
      "subUnit": 14,
      "code": "ES025",
      "description": "Wide Output of mask is set",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/08/01",
      "time": "23:04:00.223",
      "unit": 1,
      "subUnit": 14,
      "code": "ES037",
      "description": "Auxiliary Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/07/21",
      "time": "17:00:34.846",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/07/21",
      "time": "17:00:29.547",
      "unit": 1,
      "subUnit": 14,
      "code": "EA08_B01",
      "description": "Inv. not Synchronized if Aux Mains is OK",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/07/21",
      "time": "17:00:29.412",
      "unit": 1,
      "subUnit": 1,
      "code": "A019",
      "description": "Operating on Battery",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/07/21",
      "time": "17:00:29.411",
      "unit": 1,
      "subUnit": 1,
      "code": "S048",
      "description": "Rectifier Input Supply present",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2020/07/21",
      "time": "17:00:28.047",
      "unit": 1,
      "subUnit": 14,
      "code": "EA07_B01",
      "description": "Aux Mains Freq. Out of Tolerance",
      "value": false,
      "color": "0xFFE0FFFF"
    }
  ];
  */
} 
