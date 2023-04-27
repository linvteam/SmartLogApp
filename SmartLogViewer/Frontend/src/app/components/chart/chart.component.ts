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

    private readonly MarginTop = 20;
    private readonly MarginRight = 0;
    private readonly MarginBottom = 0;
    private readonly MarginLeft = 100;

    private readonly Size = 35;
    private readonly Padding = 5;

    private width = 1500;
    private xDomain : Array<Date|undefined>;// [xmin, xmax]
    private xRange = [this.MarginLeft, this.width - this.MarginRight]; // [left, right]
    private yDomain = [0,1]; // [ymin, ymax]
    private yRange = [this.Size, this.Padding]; // [bottom, top]
    private zDomain : d3.InternSet<string|undefined>; // array of z-values
    
    private x;
    private y;
    private z;
    private colors;
    private codeColors;
    constructor(private logService: LogService) {
        
        // La data va messa nel formato YYYY-MM-DDThh:mm:ss.mmmZ
        this.x = d3.map(logService.getLog().Events, e => new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z"));
        this.y = d3.map(logService.getLog().Events, e => e.Value ? 1 : 0);
        this.z = d3.map(logService.getLog().Events, e => e.Code);
        this.colors = d3.map(logService.getLog().Events, ((e: LogRow) => { return { Code: e.Code, Color: e.Color } }));
        
        this.colors.reverse();
        this.codeColors = [];
        for (let i = 0; i < this.colors.length; i++) {  //crea l'array codeColors con tuple di code e Colors non ripetuti
            let doppio = false;
            for (let j = 0; j < this.codeColors.length; j++) {
                if (this.codeColors[j].Code == this.colors[i].Code) {
                    doppio= true
                }
            }
            if (!doppio) {
                this.codeColors.push(this.colors[i]);
            }
        }

        //vengono invertite le variabili in maniera da avere i valori in ordine crescente
        this.x.reverse();
        this.y.reverse();
        this.z.reverse();
        
        this.xDomain = d3.extent(this.x);  
        this.zDomain = new d3.InternSet(this.z);

        
    }
    
    private ngOnInit(){
        
        const I = d3.range(this.x.length).filter(i => this.zDomain.has(this.z[i]));
        
        const height = this.zDomain.size * this.Size + this.MarginTop + this.MarginBottom;

        const xScale = d3.scaleTime(this.xDomain as Array<Date>, this.xRange);
        const yScale = d3.scaleOrdinal(this.yDomain, this.yRange);
        const xAxis = d3.axisTop(xScale).ticks(this.width / 80).tickSizeOuter(0);


        
        const uid = `O-${Math.random().toString(16).slice(2)}`;

        let area = d3.area()
            .curve(d3.curveStepAfter)
            // .x((_, i) => xScale(this.x[i])) Non so perché sia sbagliato ma rompe tutto
            .y0(yScale(0))
            .y1((realData, i) => yScale(realData[1]));

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

        
        defs.append("path")
            .attr("id", (_, i) => `${uid}-path-${i}`)
            .attr("d", ([d, I], i) => {
                let dati: [number, number][] =[];
                for(let i=0; i<I.length; i++){
                    dati.push([xScale(this.x[I[i]]), this.y[I[i]]]);
                }
                dati.unshift([xScale(this.xDomain[0] as Date), this.y[I[0]]  == 1 ? 0 : 1]);    //aggiunge a sinistra dei dati un punto con il valore opposto rispetto al primo elemento
                dati.push([xScale(this.xDomain[1] as Date), this.y[I[I.length - 1]]]);    //aggiunge a destra dei dati un punto con lo stesso valore dell'ultimo dato
                return area(dati);
            });

        const Bandscolors = d3.schemeGreys[Math.max(3, 1)]             
        g.attr("clip-path", (_, i) => `#${uid}-clip-${i}`)
            .selectAll("use")
            .data((d, i) => new Array(1).fill(i))
            .join("use")
            .attr("fill", (d, i) => this.codeColors[d].Color.replace("0xFF", "#"))    //imposta il colore del campo Code
            .attr("stroke", "black")                                        
            .attr("transform", (_, i) => `translate(0,${i * this.Size})`)   
            .attr("xlink:href", (i) => `#${uid}-path-${i}`);                

        g.append("text")
            .attr("font-size", "1.5em")
            .attr("x", this.MarginLeft - 100)
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

