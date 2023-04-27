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
    
    private x;
    private y;
    private z;
    private d;
    private colors;
    constructor(private logService: LogService) {
        

        this.x = d3.map(logService.getLog().Events, e => {
            console.log("Date: " + e.Date + "    Time:" + e.Time);

            //console.log("X: " + new Date(e.Date.getTime() + e.Time.getTime()));
            try {
                return new Date((e.Date as Date).getTime() + e.Time.getTime());
            } catch (error) {
                console.error(error);
                return new Date();
            }
            
        });
        //this.x = d3.map(logService.getLog().Events, e => new Date([e.Date, e.Time].join(' ')));

        this.y = d3.map(logService.getLog().Events, e => e.Value ? 1 : 0);
        this.z = d3.map(logService.getLog().Events, e => e.Code);
        this.colors = new Set(logService.getLog().Events.map( (e : LogRow) => {
            return {Code:e.Code,Color: e.Color}
        }));

        this.d = d3.map(logService.getLog().Events, (_, i) => !(this.x[i]) && !(this.y[i]));
        
        // this.x.reverse();
        // this.y.reverse();
        // this.z.reverse();
        // this.d.reverse();
        
        this.xDomain = d3.extent(this.x);
        console.log(this.xDomain);
        this.zDomain = new d3.InternSet(this.z);

        
    }
    
    private ngOnInit(){
        // console.log(this.x);
        // console.log(this.y);
        // console.log(this.z);
        
        const I = d3.range(this.x.length).filter(i => this.zDomain.has(this.z[i]));
        
        const height = this.zDomain.size * this.Size + this.MarginTop + this.MarginBottom;

        // const xScale = d3.scaleUtc(this.xDomain as Array<Date>, this.xRange);
        const xScale = d3.scaleTime(this.xDomain as Array<Date>, this.xRange);
        const yScale = d3.scaleLinear(this.yDomain, this.yRange);
        const xAxis = d3.axisTop(xScale).ticks(this.width / 80).tickSizeOuter(0);


        let newx=[];
        for (let i =0; i<this.x.length; i++) newx.push(xScale(this.x[i]))
        console.log(d3.extent(newx))
        
        
        const uid = `O-${Math.random().toString(16).slice(2)}`;

        let area = d3.area()
            // .defined((_,i) => this.d[i])
            .curve(d3.curveStepAfter)
            // .x((_, i) => xScale(this.x[i]))
            .y0(yScale(0))
            .y1((_, i) => yScale(this.y[i]));

        const svg = d3.select("figure#horizon-chart")
            .insert("svg")
            .attr("width", this.width)
            .attr("height", height)
            .attr("viewBox", [0, 0, this.width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);

        const g = svg.selectAll("g")
            .data(d3.group(I, i => this.z[i]))
            .join("g")
            .attr("transform", (_, i) => `translate(0,${i * this.Size + this.MarginTop})`);

        const defs = g.append("defs");

        defs.append("clipPath")
            .attr("id", (_, i) => `${uid}-clip-${i}`)
            .append("rect")
            .attr("y", this.Padding)
            .attr("width", this.width)
            .attr("height", this.Size - this.Padding);

        // defs.append("path")
        //     .attr("id", (_, i) => `${uid}-path-${i}`)
        //     .attr("d", ([,I]) => area(I));
        
        defs.append("path")
            .attr("id", (_, i) => `${uid}-path-${i}`)
            .attr("d", ([d, I], i) => {
                let dati: [number, number][] =[];
                // console.log("path:" + d)
                
                
                
                
                console.log("I:" + I);
                for(let i=0; i<I.length; i++){
                     console.log(this.x[I[i]]);
                     console.log(this.y[I[i]]);
                    //
                    dati.push([xScale(this.x[I[i]]), this.y[I[i]]]);
                    // dati.push([i, this.y[i]]);
                    
                    // if(i==0){
                    //     dati=[
                    //         [0,0],
                    //         [100,1],
                    //         [200,0],
                    //         [500,1],
                    //         [600,0]
                    //     ]
                    // }else{
                    //     dati=[
                    //         [0,0],
                    //         [100,1],
                    //         [200,0],
                    //         [500,1],
                    //         [600,0]
                    //     ]
                    // }
                }
                console.log(dati)
                
                return area(dati);
                return "null";
            });

        const Bandscolors = d3.schemeGreys[Math.max(3, 1)]                  //questo è inutile perchè bends è 1
        g.attr("clip-path", (_, i) => `#${uid}-clip-${i}`)                  //
            .selectAll("use")                                               //
            .data((d, i) => new Array(1).fill(i))                           //
            .join("use")                                                    //
            .attr("fill", "purple")    //
            .attr("stroke", "green")    //
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


        // var data: [number,number][] = [
        //     [ 0, 10 ],
        //     [ 10, 30 ],
        //     [ 20, 150 ],
        //     [ 50, 10 ],
        //     [ 60, 150 ],
        //     [ 70, 50 ],
        //     [ 80, 190 ]];

        // data.sort((a, b) => a[1] - b[1]);

        // var xScale = d3.scaleLinear()
        //     .domain([0, 8])
        //     .range([25, 200]);
        // var yScale = d3.scaleLinear()
        //     .domain([0, 20])
        //     .range([200, 25]);
        //
        // // Using area() function to
        // // generate area
        // var Gen = d3.area()
        //     .curve(d3.curveStepAfter)
        //     .x((p) => p[0])
        //     .y0((p) => 0)
        //     .y1((p) => p[1]);
        //
        // d3.select("svg#horizon-chart")
        //     .append("path")
        //     .attr("d", Gen(data))
        //     .attr("fill", "green")
        //     .attr("stroke", "black");
    }
}

