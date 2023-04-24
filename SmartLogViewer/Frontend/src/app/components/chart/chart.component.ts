import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

import * as d3 from 'd3';
import { LogRow } from '../../log.classes';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})



export class ChartComponent {

    /*private svg: any;
    private margin = 50;
    private width = 750 - (this.margin * 2);
    private height = 400 - (this.margin * 2);
    private createSvg(): void {
        this.svg = d3.select("figure#chart")
            .append("svg")
            .attr("width", this.width + (this.margin * 2))
            .attr("height", this.height + (this.margin * 2))
            .append("g")
            .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    }

    ngOnInit(): void {
        this.createSvg();
        ;
    }*/

    private readonly MarginTop = 20;
    private readonly MarginRight = 0;
    private readonly MarginBottom = 0;
    private readonly MarginLeft = 0;

    private readonly Size = 25;
    private readonly Padding = 1;

    private width = 640;
    private xDomain : Array<Date|undefined>;// [xmin, xmax]
    private xRange = [this.MarginLeft, this.width - this.MarginRight]; // [left, right]
    private yDomain = [0,1]; // [ymin, ymax]
    private yRange = [this.Size, this.Padding]; // [bottom, top]
    private zDomain : d3.InternSet<string|undefined>; // array of z-values

    constructor(private logService: LogService) {
        

        const x = d3.map(logService.getLog().Events, e => new Date([e.Date,e.Time].join(' ')));
        const y = d3.map(logService.getLog().Events, e => e.Value ? 1 : 0);
        const z = d3.map(logService.getLog().Events, e => e.Code);
        const colors = new Set(logService.getLog().Events.map( (e : LogRow) => {
            return {Code:e.Code,Color: e.Color}
        }));

        const d = d3.map(logService.getLog().Events, (_, i) => !(x[i]) && !(y[i]));

        this.xDomain = d3.extent(x);
        this.zDomain = new d3.InternSet(z);

        const I = d3.range(x.length).filter(i => this.zDomain.has(z[i]));

        const height = this.zDomain.size * this.Size + this.MarginTop + this.MarginBottom;

        const xScale = d3.scaleUtc(this.xDomain as Array<Date>, this.xRange);
        const yScale = d3.scaleLinear(this.yDomain, this.yRange);
        const xAxis = d3.axisTop(xScale).ticks(this.width / 80).tickSizeOuter(0);

        const uid = `O-${Math.random().toString(16).slice(2)}`;

        const area = d3.area()
            .defined((_,i) => d[i])
            .curve(d3.curveStepAfter)
            .x((_, i) => xScale(x[i]))
            .y0(yScale(0))
            .y1((_, i) => yScale(y[i]));

        const svg = d3.create("svg")
            .attr("width", this.width)
            .attr("height", height)
            .attr("viewBox", [0, 0, this.width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);

        const g = svg.selectAll("g")
            .data(d3.group(I, i => z[i]))
            .join("g")
            .attr("transform", (_, i) => `translate(0,${i * this.Size + this.MarginTop})`);

        const defs = g.append("defs");

        defs.append("clipPath")
            .attr("id", (_, i) => `${uid}-clip-${i}`)
            .append("rect")
            .attr("y", this.Padding)
            .attr("width", this.width)
            .attr("height", this.Size - this.Padding);

        defs.append("path")
            .attr("id", (_, i) => `${uid}-path-${i}`)
            .attr("d", ([,I]) => area(I));

        const Bandscolors = d3.schemeGreys[Math.max(3, 1)]                  //questo è inutile perchè bends è 1
        g.attr("clip-path", (_, i) => `#${uid}-clip-${i}`)                  //
            .selectAll("use")                                               //
            .data((d, i) => new Array(1).fill(i))                           //
            .join("use")                                                    //
            .attr("fill", (d, i) => Bandscolors[i + Math.max(0, 3 - 1)])    //
            .attr("transform", (_, i) => `translate(0,${i * this.Size})`)   //
            .attr("xlink:href", (i) => `#${uid}-path-${i}`);                //

        g.append("text")
            .attr("x", this.MarginLeft)
            .attr("y", (this.Size + this.Padding) / 2)
            .attr("dy", "0.35em")
            .text(([z]) => z);

        // Since there are normally no left or right margins, don’t show ticks that
        // are close to the edge of the chart, as these ticks are likely to be clipped.
        svg.append("g")
            .attr("transform", `translate(0,${this.MarginTop})`)
            .call(xAxis)
            .call(g => g.selectAll(".tick")
                .filter(d => xScale(d as Date) < 10 || xScale(d as Date) > this.width - 10)
                .remove())
            .call(g => g.select(".domain").remove());


    }
}

