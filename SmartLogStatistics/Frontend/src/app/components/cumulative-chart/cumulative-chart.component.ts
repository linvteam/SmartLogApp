import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';

import * as d3 from 'd3';

@Component({
  selector: 'app-cumulative-chart',
  templateUrl: './cumulative-chart.component.html',
  styleUrls: ['./cumulative-chart.component.css']
})
export class CumulativeChartComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        this.drawChart();
    }

    private drawChart(): void {

        const code = "MikeRowPyniss";

        let dateExample = new Date(2020, 1, 12, 12, 45, 32, 1);

        let exampleData: any[] = [];

        for (var i = 1; i < 10; i++) {
            exampleData.push(new CumulativeRecord(new Date(dateExample.setMonth(dateExample.getMonth() + i)), i));
        }


        const X = d3.map(exampleData, p => p.Instant);
        const Y = d3.map(exampleData, p => p.Occurrences);

        //let xDomain = d3.extent(X) as [Date, Date];
        //let yDomain = d3.extent(Y) as [Number, Number];

        let margin = { top: 20, right: 30, bottom: 30, left: 65 },
            width = 1060 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const xScale = d3.scaleTime([exampleData[0].Instant, exampleData[exampleData.length - 1].Instant], [0, width]);
        const yScale = d3.scaleLinear([exampleData[0].Occurrences, exampleData[exampleData.length - 1].Occurrences], [height, 0]);

        const line = d3.line()
            .x((d: any) => xScale(d.Instant))
            .y((d: any) => yScale(d.Occurrences));

        // append the svg object to the body of the page
        let svg = d3.select("#cumulativeChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
       
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        svg.append("g")
            .call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("font-size", "1.5em")
            .style("text-anchor", "middle")
            .text("Occorrenze");

        svg.append("path")
            .datum(exampleData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }
}

class CumulativeRecord {
    private _Instant: Date;
    private _Occurrences: Number;

    constructor(instant: Date, occurrences: Number) {
        this._Instant = instant;
        this._Occurrences = occurrences;
    }

    public get Instant() {
        return this._Instant;
    }

    public get Occurrences() {
        return this._Occurrences;
    }
}