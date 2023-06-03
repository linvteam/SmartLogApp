import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

import * as d3 from 'd3';
import { CumulativeService } from '../../services/cumulative/cumulative.service';

@Component({
  selector: 'app-cumulative-chart',
  templateUrl: './cumulative-chart.component.html',
  styleUrls: ['./cumulative-chart.component.css']
})
export class CumulativeChartComponent implements OnInit {

    private Code: string = "";

    private startDate: Date = new Date();

    private endDate: Date = new Date();

    private records: any[] = [];
    constructor(private cumulativeService: CumulativeService, private modalService: NgbModal) { }

    ngOnInit(): void {
        this.loadData();
        this.drawChart();
    }

    private loadData() {
        this.cumulativeService.serviceObs.subscribe(e =>
            e.GetCumulativeRecords().subscribe({
                next: (event: any) => {
                    if (event instanceof HttpResponse<any>) {
                        this.startDate = new Date(Date.parse(event.body.start));
                        this.endDate = new Date(Date.parse(event.body.end));
                        this.Code = event.body.code;
                        this.records = event.body.records.map((e: any) => {
                            return {
                                instant: new Date(e.instant),
                                eventOccurencies: e.eventOccurencies
                            }
                        });
                        this.drawChart()
                    }
                }, error: (err) => {
                    let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
                    modal.componentInstance.setup(err.body.message, () => { this.loadData() });
                }
            })

        )
        //this.cumulativeService.GetCumulativeRecords().subscribe({
        //    next: (event: any) => {
        //        if (event instanceof HttpResponse<any>) {
        //            this.startDate = new Date(Date.parse(event.body.start));
        //            this.endDate = new Date(Date.parse(event.body.end));
        //            this.Code = event.body.code;
        //            this.records = event.body.records;
        //        }
        //    }, error: (err) => {
        //        let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
        //        modal.componentInstance.setup(err.body.message, () => { this.loadData() });
        //        }
        //    }
        //)
    }

    private drawChart(): void {
 
        d3.selectAll("#cumulativeChart svg").remove();
        const X = d3.map(this.records, d => d.instant);
        const Y = d3.map(this.records, p => p.eventOccurencies);

        const xDomain = d3.extent(X) as [Date, Date];
        const yDomain = d3.extent(Y) as [Number, Number];

        let margin = { top: 20, right: 30, bottom: 30, left: 65 },
            width = 1060 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const xScale = d3.scaleTime(xDomain, [0, width]);
        const yScale = d3.scaleLinear(yDomain, [height, 0]);

        const line = d3.line()
            .x((d: any) => xScale(d.instant))
            .y((d: any) => yScale(d.eventOccurencies));

        // append the svg object to the body of the page
        let svg = d3.select("#cumulativeChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
       
        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        svg.append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(yScale));

        d3.selectAll("g.xAxis g.tick")
            .append("line")
            .attr("class", "gridline")
            .attr("x1", 0)
            .attr("y1", -height)
            .attr("x2", 0)
            .attr("y2", 0)
            .attr("stroke", "#9ca5aecf") // line color
            .attr("stroke-dasharray", "4") // make it dashed;

        d3.selectAll("g.yAxis g.tick")
            .append("line")
            .attr("class", "gridline")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("stroke", "#9ca5aecf") // line color
            .attr("stroke-dasharray", "4") // make it dashed;

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("font-size", "1.5em")
            .style("text-anchor", "middle")
            .text("Occorrenze");

        svg.append("path")
            .datum(this.records)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }
}