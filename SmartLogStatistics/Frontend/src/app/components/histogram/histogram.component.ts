import { Component } from '@angular/core';
import {TotalByCodeService} from "../../services/total-by-code/total-by-code.service";
import * as d3 from "d3";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent {
  
  private x: any;
  private y: any;
  private xDomain: any;
  private xLabel: string;
  private yLabel: string;
  private width: number;
  private barHeight: number;
  private totalByCodeService: TotalByCodeService;

  constructor(private totalByCode: TotalByCodeService) {
    this.totalByCodeService = totalByCode;
    
    this.x = [3,7,2,4,6,3,4];                 //!Eliminare questa riga quando verrà usato il service
    this.y = ["A","B","C","D","E","F","G"];   //!Eliminare questa riga quando verrà usato il service
    
    // x = TotalByCodeService.GetRoba()       //Inizializzare x con valori dal service
    // y = TotalByCodeService.GetAltraRoba()  //Inizializzare y con valori dal service
    
    this.xDomain = d3.extent(this.x);
    this.xLabel = "N. di occorrenze";
    this.yLabel = "Codici";
    
    this.width = 1500;
    this.barHeight = 35;
    
  }
  
}
