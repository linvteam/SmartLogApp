import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { formatDate, registerLocaleData } from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

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
    private height;
    private xDomain : Array<Date|undefined>;// [xmin, xmax]
    private xRange = [this.MarginLeft, this.width - this.MarginRight]; // [left, right]
    private yDomain = [0,1]; // [ymin, ymax]
    private yRange = [this.Size, this.Padding]; // [bottom, top]
    private zDomain : d3.InternSet<string|undefined>; // array of z-values
    
    private x;
    private y;
    private z;
    private codeColors;
    private descriptions;
    private units;
    private subUnits;

    private xScale;
    private yScale;
    private xAxis;
    private svg: any;
    private g: any;//: d3.Selection<d3.BaseType,unknown,SVGSVGElement,unknown>;
    private plot: any;
    private gXAxis : any;
    
    public hovering: boolean= false;
    constructor(private logService: LogService) {
        
        // La data va messa nel formato YYYY-MM-DDThh:mm:ss.mmmZ
        this.x = d3.map(logService.getLog().Events, e => new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z"));
        this.y = d3.map(logService.getLog().Events, e => e.Value ? 1 : 0);
        this.z = d3.map(logService.getLog().Events, e => e.Code);
        let colors = d3.map(logService.getLog().Events, ((e: LogRow) => { return { Code: e.Code, Color: e.Color } }));
        
        colors.reverse();
        this.codeColors = [];
        for (let i of colors) {  //crea l'array codeColors con tuple di code e Colors non ripetuti
            if (this.codeColors.indexOf(i) == -1) {
                this.codeColors.push(i);
            }
        }

        //vengono invertite le variabili in maniera da avere i valori in ordine crescente
        this.x.reverse();
        this.y.reverse();
        this.z.reverse();
        
        this.xDomain = d3.extent(this.x);  
        this.zDomain = new d3.InternSet(this.z);

        this.height = this.zDomain.size * this.Size + this.MarginTop + this.MarginBottom;
        this.xScale = d3.scaleTime(this.xDomain as Array<Date>, this.xRange);
        this.yScale = d3.scaleOrdinal(this.yDomain, this.yRange);
        this.xAxis = d3.axisTop(this.xScale).ticks(this.width / 80).tickSizeOuter(0);

        
        //getValori per il tooltip
        this.descriptions = d3.map(logService.getLog().Events, e => e.Description);
        this.units = d3.map(logService.getLog().Events, e => e.Unit);
        this.subUnits = d3.map(logService.getLog().Events, e => e.SubUnit);
    }
    
    private ngOnInit() {

        const I = d3.range(this.x.length).filter(i => this.zDomain.has(this.z[i]));

        const uid = `O-${Math.random().toString(16).slice(2)}`;

        let area = d3.area()
            .curve(d3.curveStepAfter)
            .y0(this.yScale(0))
            .y1((realData, i) => this.yScale(realData[1]));

        this.svg = d3.select("figure#horizon-chart")
            .insert("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", [0, 0, this.width, this.height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .call((svg: any) => this.zoom(svg, this.xScale, this.yScale));

        this.g = this.svg.selectAll("g")
            .data(d3.group(I, i => this.z[i]))
            .join("g")
            .attr("transform", (_ : any, i : any) => `translate(0,${i * this.Size + this.MarginTop})`);

        const defs = this.g.append("defs");

        defs.append("clipPath")
            .attr("id", (_: any, i: any) => `${uid}-clip-${i}`)
            .append("rect")
            .attr("y", this.Padding)
            .attr("width", this.width)
            .attr("height", this.Size - this.Padding);

        this.createClipRect();

        this.plot = defs.append("path")
            .attr("id", (_: any, i: any) => `${uid}-path-${i}`)
            .attr("d", ([d, I]: any, i: any) => {
                let dati: [number, number][] = [];
                for (let i of I) {
                    dati.push([this.xScale(this.x[i]), this.y[i]]);
                }
                dati.unshift([this.xScale(this.xDomain[0] as Date), this.y[I[0]] == 1 ? 0 : 1]);    //aggiunge a sinistra dei dati un punto con il valore opposto rispetto al primo elemento
                dati.push([this.xScale(this.xDomain[1] as Date), this.y[I[I.length - 1]]]);    //aggiunge a destra dei dati un punto con lo stesso valore dell'ultimo dato
                return area(dati);
                })
            .on("mousemove", (e: any, [code, I]: [string, [number]]) => {
                this.hovering=true;
                let xPointer = d3.pointer(e)[0];
                let yPointerRel = d3.pointer(e)[1];
                let datetime=this.xScale.invert(xPointer);
                let start: Date = this.xDomain[0] as Date;
                let end: Date = this.xDomain[1] as Date;
                
                for (let i =0; i<I.length; i++){
                    if(this.x[I[i]] >= datetime){
                        end = this.x[I[i]];
                        if(i>0){
                            start = this.x[I[i-1]]
                        }
                        break;
                    }
                }
                let codePosition:number=0;
                let codeList: any[] = Array.from(this.zDomain);
                for(let i =0; i<this.zDomain.size; i++){
                    if(code==codeList[i]){
                        codePosition=i;
                        break;
                    }
                }
                
                // xPointer *= 0.9375;
                let yPointer= (yPointerRel+codePosition*(this.Size)) * 0.9375;
                let absoluteX = e.clientX;
                let absoluteY = e.clientY;
                this.setTooltipInfo(start, end, code, this.units[I[0]], this.subUnits[I[0]], this.descriptions[I[0]]);
                this.moveTooltip(absoluteX, absoluteY);
                
                // for(let i in I){
                //     if(this.x[i] <= datetime){
                //         start = this.x[i];
                //     }
                // }
            })
            .on("mouseleave", (e: any) => {
                this.hovering = false;
            });

        this.g.attr("clip-path", (_: any, i: any) => `#${uid}-clip-${i}`)
            .selectAll("use")
            .data((d: any, i: any) => new Array(1).fill(i))
            .join("use")
            .attr("clip-path", "url(#clip)")
            .attr("fill", (d: any, i: any) => this.codeColors[d].Color.replace("0xFF", "#"))    //imposta il colore del campo Code
            .attr("stroke", "black")
            .attr("transform", (_: any, i: any) => `translate(0,${i * this.Size})`)
            .attr("xlink:href", (i: any) => `#${uid}-path-${i}`);

        this.g.append("text")
            .attr("font-size", "1.5em")
            .attr("x", this.MarginLeft - 100)
            .attr("y", (this.Size + this.Padding) / 2)
            .attr("dy", "0.35em")
            .text(([z]: any) => z);

        // Since there are normally no left or right margins, don’t show ticks that
        // are close to the edge of the chart, as these ticks are likely to be clipped.
        this.gXAxis = this.svg.append("g")
            .attr("transform", `translate(0,${this.MarginTop})`)
            .call(this.xAxis)
            .call((g: any) => g.selectAll(".tick")
                .filter((d: any) => this.xScale(d as Date) < 10 || this.xScale(d as Date) > this.width - 10)
                .remove())
            .call((g: any) => g.select(".domain").remove());
        
    }
    
    private zoom(svg: any, x: any, y: any) {
    svg.call(d3.zoom()
        //limiti del moltiplicatore di zoom/de-zoom, da 0x a infinito
        //quindi de-zoom infinito e zoom infinito
        .scaleExtent([1, Infinity])
        //operazione da eseguire quando si effettua lo zoom/trascinamento
        .on("zoom", (event: any) => this.zoomed(event, y, x)));
    }

    private zoomed(event: any, y: any, x: any) {

        //assex viene scalato con le nuove dimensioni dopo zoom o scroll

        this.xScale = event.transform.rescaleX(x);
        this.gXAxis.call(d3.axisTop(this.xScale));

        //ridò la definizione di come dev'essere creata la linea con la nuova scala
        //riplotto il grafico
        let area = d3.area()
            .curve(d3.curveStepAfter)
            .y0(this.yScale(0))
            .y1((realData, i) => this.yScale(realData[1]));

        this.plot.attr("d", ([d, I]: any, i: any) => {
            let dati: [number, number][] = [];
            for (let i of I) {
            dati.push([this.xScale(this.x[i]), this.y[i]]);
            }
            dati.unshift([this.xScale(this.xDomain[0] as Date), this.y[I[0]] == 1 ? 0 : 1]);    //aggiunge a sinistra dei dati un punto con il valore opposto rispetto al primo elemento
            dati.push([this.xScale(this.xDomain[1] as Date), this.y[I[I.length - 1]]]);    //aggiunge a destra dei dati un punto con lo stesso valore dell'ultimo dato
            return area(dati);
        });
    }

    private createClipRect(): any {
        const defs: any = this.svg.append("defs");
        const clipTag: any = defs.append("clipPath").attr("id", "clip");
        return clipTag.append("rect")
            .attr("x", this.MarginLeft)
            .attr("width", this.width - this.MarginLeft)
            .attr("height", this.height)
    }
    
    private setTooltipInfo(start: Date, end: Date, code: string, unit: number, subUnit: number, description: string){
        const format = 'yyyy/MM/dd - HH:mm:ss.SSS';
        const locale = "it-IT";
        d3.select("div div#tooltip p#code").text("Code: " + code)
        d3.select("div div#tooltip p#start").text("Data inizio: " + formatDate(start, format, locale));
        d3.select("div div#tooltip p#end").text("Data fine: " + formatDate(end, format, locale));
        d3.select("div div#tooltip p#unit").text("Unit: " + unit);
        d3.select("div div#tooltip p#subunit").text("SubUnit: " + subUnit);
        d3.select("div div#tooltip p#description").text("Descrizione: " + description);
    }
    
    private moveTooltip(x: number, y: number){
        
        if(x>1100){
            x-=360;
        }

        if(y>700){
            y-=250;
        }
        
        d3.select("div div#tooltip")
            .style("left", x + "px")
            .style("top", y + "px")
    }
}

