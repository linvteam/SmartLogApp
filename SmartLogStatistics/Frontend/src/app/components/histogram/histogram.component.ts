import {Component, OnInit, ViewChild} from '@angular/core';
import {TotalByCodeService} from "../../services/total-by-code/total-by-code.service";
import * as d3 from "d3";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit{
  
  protected x: any;
  private y: any;
  private xOriginal: any;
  private yOriginal: any;
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
  
  protected sortForm: any;
  
  private colorList: string[];

    
  constructor(private totalByCode: TotalByCodeService, private modal: NgbModal) {
    this.sortForm = new FormGroup({sortSelection: new FormControl("0")});
    this.x = [];
    this.y = [];
    this.totalByCodeService = totalByCode;
    this.modalService = modal;
    
    this.xDomain = [];
    this.xLabel = "N. di occorrenze";
    this.yLabel = "Codici";
    
    this.width = 1500;
    this.barHeight = 50;
    
    this.marginTop = 40;
    this.marginRight = 0;
    this.marginBottom = 0;
    this.marginLeft = 100;
    
    this.yPadding = 0.1; //valore compreso fra 0 e 1
    
    this.height=0;
    this.xRange=[];
    this.yRange=[];
    
    // this.colorList = ["#D169F0","#68B1F7","#69E17F","#F7E568","#ED8F64"];
    // this.colorList = ["#602AEB","#3A24F2","#2C37DB","#2455F2","#2F7BEB"];
    this.colorList = [];
  }
  
  ngOnInit(): void {
      
  }
  
  drawChart(): void{

    this.deleteChart();
    
    // this.xScale = d3.scaleOrdinal(this.xDomain, this.xRange);
    this.xDomain = [0, Math.max(...this.x)];

    this.height = ((this.y.length) * this.barHeight) + this.marginTop + this.marginBottom;

    this.xRange = [this.marginLeft, this.width - this.marginRight - 7];
    this.yRange = [this.marginTop, this.height - this.marginBottom];
    
    this.xScale = d3.scaleLinear(this.xDomain, this.xRange);
    this.yScale = d3.scaleBand()
                    .domain(this.y)
                    .range(this.yRange)
                    .padding(this.yPadding);

    const xAxisTicks = this.xScale.ticks(15).filter((tick:any)=> Number.isInteger(tick));
    this.xAxis =  d3.axisTop(this.xScale)
                    .tickValues(xAxisTicks)
                    .tickFormat((d) => d3.format("d")(d as number));
    this.yAxis = d3.axisLeft(this.yScale).tickSizeOuter(0);

  
    this.svg = d3.select("figure#histogram-chart")
        .insert("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("viewBox", [0, 0, this.width, this.height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("background-color", "#f00")
      
    this.svg.append("g")
        .attr("transform", `translate(0,${this.marginTop})`)
        .call(this.xAxis)
          .style('font-size', '17px')
          .style('font-weight', 'bold');
    
        // .call((g: any) => g.append("text")
        //     .attr("x", this.width/2)
        //     .attr("y", 22)
        //     .text(this.xLabel));


    // this.svg.append("g")
    //     .attr("fill", "#04e")
    //     .selectAll("rect")
    //     .data(d3.range(this.x.length))
    //     .join("rect")
    //     .attr("x", this.xScale(0))
    //     .attr("y", (i: number) => this.yScale(this.y[i]))
    //     .attr("width", (i: number) => this.xScale(this.x[i]) - this.xScale(0))
    //     .attr("height", this.yScale.bandwidth());

    
      const seed =Math.random()*360;
      this.svg.append("g")
          // .attr("fill", "#04e")
          .selectAll("path")
          .data(d3.range(this.x.length))    .join("path")
          .attr("d", (i: number) => {      
                const x = this.xScale(0);
                const y = this.yScale(this.y[i]);      
                const width = this.xScale(this.x[i]) - this.xScale(0);
                const height = this.yScale.bandwidth();      
                const radius = 5; // Adjust the radius as needed
                return `  M ${x},${y}
                          H ${x + width - radius}    
                          Q ${x + width},${y} ${x + width},${y + radius}
                          V ${y + height - radius}    
                          Q ${x + width},${y + height} ${x + width - radius},${y + height}
                          H ${x}    V ${y} Z  `;
          })
          .attr("fill", (d: any, i:number) => `hsl(${seed+(i*137.51)}deg 50% 50%)`) 
          .style("opacity", 0.8);
    
      
      
    this.svg.append("g")
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 17)
        .attr('font-weight', 'bold')
        .selectAll("text")
        .data(d3.range(this.x.length))
        .join("text")
        .attr("x", (i: any) => this.xScale(this.x[i]))
        .attr("y", (i: any) => this.yScale(this.y[i]) + this.yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text((i: number) => this.x[i])
        .call((text: any) => text.filter((i:any) => this.xScale(this.x[i]) - this.xScale(0) < 20) // short bars
            .attr("dx", +4)
            .attr("fill", "#000")
            .attr("text-anchor", "start"));
    
    
    this.svg.append("g")
        .attr("transform", `translate(${this.marginLeft},0)`)
        .call(this.yAxis)
          .style('font-size', '17px')
          .style('font-weight', 'bold');

    
  }

  private updateData(): any {
    return (event: any) => {
      if(event.body != undefined) {
        this.x = event.body.codeOccurences.map((l: any) => l.eventOccurrences);
        this.y = event.body.codeOccurences.map((l: any) => l.code);
        this.xOriginal = [...this.x];
        this.yOriginal = [...this.y];
        this.drawChart();
      }
    };
  }

  private deleteChart(){d3.select("figure#histogram-chart svg").remove();}
  
  private errorHandler() {
    return (err: any) => {
      let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
      modal.componentInstance.setup(err.status + " " + err.error.message, () => {
        this.x = [];
        this.y = [];
        this.deleteChart();
      });
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

  protected sortValues() {
    const type = this.sortForm.value.sortSelection;
    
    if(type==0){
      this.x = [...this.xOriginal];
      this.y = [...this.yOriginal];
      
      this.drawChart()
      return;
    }
    const compare = ( a: any, b:any ) => {
      if(type%2!=0){
        if ( a.code < b.code ){
          return (-1)*type;
        }
        if ( a.code > b.code ){
          return (1)*type;
        }
        return 0;
      } else {
        if ( a.value < b.value ){
          return (-1)*type;
        }
        if ( a.value > b.value ){
          return (1)*type;
        }
        return 0;
      }
    }
    
    const temp = this.x.map((v: number, i: number) => {
      return { code: this.y[i], value: v }
    });
    temp.sort(compare);

    this.x = temp.map((l: any) => l.value);
    this.y = temp.map((l: any) => l.code);
    
    this.drawChart();
    
    
  }

  
}
