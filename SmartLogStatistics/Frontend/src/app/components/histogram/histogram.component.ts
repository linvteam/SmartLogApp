import {Component, OnInit} from '@angular/core';
import {TotalByCodeService} from "../../services/total-by-code/total-by-code.service";
import * as d3 from "d3";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorModalComponent} from "../error-modal/error-modal.component";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit{
  
  private x: any;
  private y: any;
  private xDomain: any;
  private xLabel: string;
  private yLabel: string;
  private width: number;
  private barHeight: number;
  private totalByCodeService: TotalByCodeService;
  private modalService: NgbModal;
  
  private marginTop: number;
  private marginRight: number;
  private marginBottom: number;
  private marginLeft: number;
  
  private xScale: any;
  private yScale: any;
  private yPadding: number;
  
  private xRange: number[];
  private height: number;
  private yRange: number[];
  private xAxis: any;
  private yAxis: any;

  private svg: any;
    
  constructor(private totalByCode: TotalByCodeService, private modal: NgbModal) {
    this.x = [1,2];
    this.y = ["A","B"];
    this.totalByCodeService = totalByCode;
    this.modalService = modal;
    
    this.xDomain = [0, Math.max(...this.x)];
    this.xLabel = "N. di occorrenze";
    this.yLabel = "Codici";
    
    this.width = 1500;
    this.barHeight = 200;
    
    this.marginTop = 20;
    this.marginRight = 0;
    this.marginBottom = 0;
    this.marginLeft = 20;
    this.height = ((this.y.length) * this.barHeight) + this.marginTop + this.marginBottom;
    
    this.yPadding = 0;
    
    this.xRange = [this.marginLeft, this.width - this.marginRight - 2];
    this.yRange = [this.marginTop, this.barHeight - this.marginBottom];
    
    
  }
  
  ngOnInit(): void {
    this.drawChart();
  }
  
  drawChart(): void{

    d3.select("figure#histogram-chart svg").remove();
    
    // this.xScale = d3.scaleOrdinal(this.xDomain, this.xRange);
    this.xDomain = [0, Math.max(...this.x)];

    this.xScale = d3.scaleLinear(this.xDomain, this.xRange);
    this.yScale = d3.scaleBand(this.y, this.yRange).padding(this.yPadding);
    this.xAxis = d3.axisTop(this.xScale).ticks(this.x.length);
    this.yAxis = d3.axisLeft(this.yScale).tickSizeOuter(0);

  
    this.svg = d3.select("figure#histogram-chart")
        .insert("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("viewBox", [0, 0, this.width, this.height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      
    this.svg.append("g")
        .attr("transform", `translate(0,${this.marginTop})`)
        .call(this.xAxis)
        .call((g: any) => g.append("text")
            .attr("x", this.width - this.marginRight)
            .attr("y", -22)
            .text(this.xLabel));


    this.svg.append("g")
        .attr("fill", "#04e")
        .selectAll("rect")
        .data(d3.range(this.x.length))
        .join("rect")
        .attr("x", this.xScale(0))
        .attr("y", (i: number) => this.yScale(this.y[i]))
        .attr("width", (i: number) => this.xScale(this.x[i]) - this.xScale(0))
        .attr("height", this.yScale.bandwidth());

    //TODO Aggiungere scritte coi valori di ogni barra

    this.svg.append("g")
        .attr("transform", `translate(${this.marginLeft},0)`)
        .call(this.yAxis);
    
  }

  private updateData(): any {
    return (event: any) => {
      if(event.body != undefined) {
        // this.x = event.body.codeOccurences.map((l: any) => l.code);
        // this.y = event.body.codeOccurences.map((l: any) => l.eventOccurrences);
        this.x = [3,7,2,4,6,3,4,15];
        this.y = ["A","B","C","D","E","F","G","H"];
        this.drawChart();
      }
    };
  }

  private errorHandler() {
    return (err: any) => {
      let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
      modal.componentInstance.setup("", () => {
        this.x = [];
        this.y = [];
      });
      // alert("Non è stato possibile ottenere i dati");
    }
  }

  onSubmit(value: any) {
    if(value.startDatetime != null && value.endDatetime != null){
      this.totalByCodeService.GetTotalByCode(value.startDatetime, value.endDatetime).subscribe({
        next:this.updateData(),
        error: this.errorHandler()
      });
    }
  }
}
