import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { formatDate, registerLocaleData } from "@angular/common";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import localeIT from "@angular/common/locales/it";
registerLocaleData(localeIT, "it");

import * as d3 from 'd3';
import { CumulativeService } from '../../services/cumulative/cumulative.service';

@Component({
  selector: 'app-cumulative-chart',
  templateUrl: './cumulative-chart.component.html',
  styleUrls: ['./cumulative-chart.component.css']
})
export class CumulativeChartComponent {

    private Code: string = "";

    private startDate: Date = new Date();

    private endDate: Date = new Date();

    private modalService?: NgbModal;

    private records: any[] = [];
    constructor(private cumulativeService: CumulativeService) {
        this.loadData();
    }

    public loadData() {
        this.cumulativeService.GetCumulativeRecords().subscribe({
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
                let modal = this.modalService?.open(ErrorModalComponent, { size: 'sm' });
               modal?.componentInstance.setup(err.body.message, () => { this.loadData() });
                }
            }

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

        const dateFormat = 'yyyy/MM/dd - HH:mm:ss.SSS';
        const locale = "it-IT";
        const timezone = "UTC";
 
        d3.selectAll("figure#cumulative-chart svg").remove();
        d3.selectAll("figure#cumulative-chart .tooltip").remove();
        const X = d3.map(this.records, d => d.instant);
        const Y = d3.map(this.records, p => p.eventOccurencies);

        const xDomain = d3.extent(X) as Array<Date>;
        const yDomain = d3.extent(Y) as Array<Number>;

        let margin = { top: 60, right: 30, bottom: 30, left: 65 },
            width = 1060 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const xScale = d3.scaleTime(xDomain, [0, width]);
        const yScale = d3.scaleLinear(yDomain, [height, 0]);

        const line = d3.line()
            .x((d: any) => xScale(d.instant))
            .y((d: any) => yScale(d.eventOccurencies));

        // append the svg object to the body of the page
        let svg = d3.select("figure#cumulative-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + (margin.top) + ")");

        svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr("transform",
                "translate(0," + -10 + ")")
            .text(`Occorrenze di ${this.Code} nel periodo tra ${formatDate(this.startDate, dateFormat, locale, timezone)} e ${formatDate(this.startDate, dateFormat, locale, timezone)}`);

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
            .attr("stroke", "#69b3a2")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);


        let dots = svg
            .append("g")
            .selectAll("dot")
            .data(this.records)
            .enter()
            .append("circle")
            .attr("cx", (d: any) => xScale(d.instant))
            .attr("cy", (d: any) => yScale(d.eventOccurencies))
            .attr("r", 5)
            .attr("fill", "#69b3a2")

        const Tooltip = d3.select("figure#cumulative-chart")
            .append("div")
            .attr("class","tooltip")
            .style("position", "absolute")
            .style("opacity", 0)
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")

        Tooltip.append("p").attr("id", "instant")

        Tooltip.append("p").attr("id", "occurrencies")

        const mouseOver = (e: any, d: any) => {
            Tooltip.select("p#instant").text("Istante: " + formatDate(d.instant, dateFormat, locale, timezone);
            Tooltip.select("p#occurrencies").text("Occorrenze: " + d.eventOccurencies)
            return Tooltip.style("opacity", 1);
        }

        const mouseMove = (event: any) => {
            let x = event.clientX
            let y = event.clientY
            if (this.tooltipCollideX(x)) { //se è troppo a destra lo sposta a sinistra del mouse
                x -= 390;
            }

            if (this.tooltipCollideY(y)) {  //se è troppo in basso lo sposta in sopra al mouse
                y -= 130;
            }

            return Tooltip.style("top", (y + 20) + "px").style("left", (x - 100) + "px");
        }

        const mouseOut = () => {
            Tooltip.style("top", 0 + "px").style("left", 0 + "px")
            return Tooltip.style("opacity", 0);
        }

        dots.on("mouseover", mouseOver)
            .on("mousemove", mouseMove)
            .on("mouseout", mouseOut);

        // Imposta gli eventi con il mouse
        
    }

    /**
     * Funzione che ritorna true se la posizione del mouse è vicina al margine destro
     * @param x coordinata x del cursore
     * @private
     */
    private tooltipCollideX(x: number) {
        return 365 + x > window.innerWidth;
    }

    /**
     * Funzione che ritorna true se la posizione del mouse è vicina al margine inferiore
     * @param y coordinata y del cursore
     * @private
     */
    private tooltipCollideY(y: number) {
        return 120 + y > window.innerHeight;
    }

    private formatDate()
}