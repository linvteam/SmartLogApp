import { Component, OnInit } from '@angular/core';
import { formatDate, registerLocaleData } from "@angular/common";
import localeIT from "@angular/common/locales/it";
import { LogManipulationService } from "src/app/services/LogManipulation/log-manipulation.service";
registerLocaleData(localeIT, "it");

import * as d3 from 'd3';
import { LogRow } from '../../log.classes';
import { LogManipulator  } from '../../LogManipulator/log-manipulator';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

    private readonly marginTop = 20;
    private readonly marginRight = 0;
    private readonly marginBottom = 0;
    private readonly marginLeft = 200;

    private readonly size = 35;
    private readonly padding = 5;

    private width = 1500;
    private height;
    private xDomain : Array<Date|undefined>;// [xmin, xmax]
    private xRange = [this.marginLeft, this.width - this.marginRight - 2]; // [left, right], i due px hard coded servono per vedere l'ultimo tick a dx
    private yDomain = [0,1]; // [ymin, ymax]
    private yRange = [this.size, this.padding]; // [bottom, top]
    private zDomain: d3.InternSet<string|undefined>; // array of z-values
    
    private x;
    private y;
    private z;
    private codeColors;
    private descriptions: Record<string, string> = {}

    private xScale;
    private yScale;
    private xAxis;
    private svg: any;
    private g: any;
    private plot: any;
    private gXAxis : any;
    
    public hovering: boolean = false;
    public events: LogRow[];
    private logManipulator: LogManipulator;
    private zoomMultiplier: number;

    private ConvertDateTime(e: LogRow) { return new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z"); }

    constructor(private logManipulationService: LogManipulationService) {

        this.logManipulator = logManipulationService.getDefaultManipulator();
        this.events = this.logManipulator.getGroup(1);

        this.logManipulationService.manipulatedLog.subscribe(value => {
            this.logManipulator = value;
            this.events = this.logManipulator.getGroup(1);
            this.update();
            this.draw();
        });

        // La data va messa nel formato YYYY-MM-DDThh:mm:ss.mmmZ
        this.x = d3.map(this.events, e => new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z"));
        this.y = d3.map(this.events, e => e.Value ? 1 : 0);
        this.z = d3.map(this.events, e => `${e.Code} (U=${e.Unit}, S=${e.SubUnit})`); // Per zDomain string
        

        let colors = d3.map(this.events, ((e: LogRow) => { return { Code: e.Code, Color: e.Color } }));
        
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

        this.height = (this.zDomain.size) * this.size + this.marginTop + this.marginBottom;
        this.xScale = d3.scaleTime(this.xDomain as Array<Date>, this.xRange);
        this.yScale = d3.scaleOrdinal(this.yDomain, this.yRange);
        this.xAxis = d3.axisTop(this.xScale).ticks(this.width / 80).tickSizeOuter(0);

        
        //getValori per il tooltip
        //this.descriptions = d3.map(this.events, e => e.Description);
        this.descriptions = {}
        for (let e of this.events) {
            this.descriptions[e.Code] = e.Description;
        }

        //calcolo i valori di max zoom
        this.zoomMultiplier = ((this.xDomain[1] as Date).getTime() - (this.xDomain[0] as Date).getTime()) / 100;
    }

    private update() {
        // La data va messa nel formato YYYY-MM-DDThh:mm:ss.mmmZ
        this.x = d3.map(this.events, e => new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z"));
        this.y = d3.map(this.events, e => e.Value ? 1 : 0);
        this.z = d3.map(this.events, e => `${e.Code} (U=${e.Unit}, S=${e.SubUnit})`);
        let colors = d3.map(this.events, ((e: LogRow) => { return { Code: e.Code, Color: e.Color } }));

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

        this.height = (this.zDomain.size) * this.size + this.marginTop + this.marginBottom;
        this.xScale = d3.scaleTime(this.xDomain as Array<Date>, this.xRange);
        this.yScale = d3.scaleOrdinal(this.yDomain, this.yRange);
        this.xAxis = d3.axisTop(this.xScale).ticks(this.width / 80).tickSizeOuter(0);


        //getValori per il tooltip
        //this.descriptions = d3.map(this.events, e => e.Description);
        this.descriptions = {}
        for (let e of this.events) {
            this.descriptions[e.Code] = e.Description;
        }

        //calcolo i valori di max zoom
        this.zoomMultiplier = ((this.xDomain[1] as Date).getTime() - (this.xDomain[0] as Date).getTime()) / 100;
    }

    private ngOnInit() {
        this.draw();
    }
    
    private draw() {

        d3.select("figure#horizon-chart svg").remove();

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
            .attr("transform", (_ : any, i : any) => `translate(0,${i * this.size + this.marginTop})`);

        const defs = this.g.append("defs");

        defs.append("clipPath")
            .attr("id", (_: any, i: any) => `${uid}-clip-${i}`)
            .append("rect")
            .attr("y", this.padding)
            .attr("width", this.width)
            .attr("height", this.size - this.padding);

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
            });

         this.g.on("mousemove", (e: any,[eventString, I]: [string, [number]]) => {
             let xPointer = d3.pointer(e)[0];
             
             let dateTime = this.xScale.invert(xPointer);
             let start: Date = this.xDomain[0] as Date;
             let end: Date = this.xDomain[1] as Date;
             
             //  Imposta la data dell'evendo precedente e successiva dell'intervallo che si stà osservando
             for (let i = 0; i < I.length; i++) {    
                 if (this.x[I[i]] >= dateTime) {
                     end = this.x[I[i]];
                     if (i > 0) {
                         start = this.x[I[i - 1]]
                     }
                     break;
                 }
             }

             let absoluteX = e.clientX;
             let absoluteY = e.clientY;


             let code = eventString.slice(0, eventString.indexOf(" "));

             let unit = eventString.slice(eventString.indexOf('(U=') + 3, eventString.indexOf(", "));
             let subUnit = eventString.slice(eventString.indexOf(', S=') + 4, eventString.indexOf(")"));


             this.setTooltipInfo(dateTime,start, end, code, unit, subUnit, this.descriptions[code]);
             this.moveTooltip(absoluteX, absoluteY);
             });
        this.g.attr("clip-path", (_: any, i: any) => `#${uid}-clip-${i}`)
            .selectAll("use")
            .data((d: any, i: any) => new Array(1).fill(i))
            .join("use")
            .attr("clip-path", "url(#clip)")
            .attr("fill", (d: any, i: any) => this.codeColors[d].Color.replace("0xFF", "#"))    //imposta il colore del campo Code
            .attr("stroke", "black")
            .attr("transform", (_: any, i: any) => `translate(0,${i * this.size})`)
            .attr("xlink:href", (i: any) => `#${uid}-path-${i}`)
            .on("mouseleave", (e: any) => {
                this.hovering = false; //rende invisibile il tooltip e la barra verticale
            })
            .on("mouseover", (e: any) => { //rende visibile il tooltip e la barra verticale
                this.hovering = true
            });

        this.g.append("text")
            .attr("font-size", "1.5em")
            .attr("x", 0)
            .attr("y", (this.size + this.padding) / 2)
            .attr("dy", "0.35em")
            .text(([z]: any) => z);
        //Dato che normalmente non ci sono margini a sinistra o a destra, non si mostrano i segni di graduazione che sono vicini al bordo del grafico
        // poiché è probabile che questi segni vengano tagliati
        this.gXAxis = this.svg.append("g")
            .attr("transform", `translate(0,${this.marginTop})`)
            .call(this.xAxis)
            .call((g: any) => g.selectAll(".tick")
                .filter((d: any) => this.xScale(d as Date) < 10 || this.xScale(d as Date) > this.width - 10)
                .remove())
            .call((g: any) => g.select(".domain").remove());

        //muove barra verticale che indica l'ora su cui si sta facendo hover facendola seguire il mouse
        d3.select("figure#horizon-chart").on("mousemove", e => {
            let mousex = d3.pointer(e)[0];
            d3.select("div div#verticalline").style("left", mousex + "px");
        });
    }

    /**
     * Funzione di supporto per zoomed(), stabilisce i limiti di zoom
     * @param svg grafico
     * @param x scala dell'asse x
     * @param y scala dell'asse y
     * @private
     */
    private zoom(svg: any, x: any, y: any) {
    svg.call(d3.zoom()
        //limiti del moltiplicatore di zoom/de-zoom, da 0x a infinito
        //quindi de-zoom infinito e zoom infinito
        .scaleExtent([.75, this.zoomMultiplier])
        //operazione da eseguire quando si effettua lo zoom/trascinamento
        .on("zoom", (event: any) => this.zoomed(event, y, x)));
    }

    /**
     * Funzione che implementa la funzionalità di zoom scalando gli assi ed il grafico
     * @param event evento
     * @param y scala dell'asse y
     * @param x scala dell'asse x
     * @private
     */
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

    /**
     * Funzione che delimita la porzione su cui viene disegnato il grafico
     * @private
     */
    private createClipRect(): any {
        const defs: any = this.svg.append("defs");
        const clipTag: any = defs.append("clipPath").attr("id", "clip");
        return clipTag.append("rect")
            .attr("x", this.marginLeft)
            .attr("width", this.width - this.marginLeft)
            .attr("height", this.height)
    }

    /**
     * Funzione che scrive i dati sul tooltip che viene visualizzato quando si fa hover sul grafico
     * @param currentDate data su cui si sta facendo l'hover
     * @param start data in cui è cominciato l'evento
     * @param end data in cui è finito l'evento
     * @param code code dell'evento
     * @param unit campo unit dell'evento
     * @param subUnit campo subUnit dell'evento
     * @param description descrizione dell'evento
     * @private
     */
    private setTooltipInfo(currentDate: Date,start: Date, end: Date, code: string, unit: string, subUnit: string, description: string){
        const format = 'yyyy/MM/dd - HH:mm:ss.SSS';
        const locale = "it-IT";
        //aggiorna il tooltip con i dati nuovi
        const tooltip =d3.select("div div#tooltip");
        tooltip.select("p span#code").text(code)
        tooltip.select("p span#currentdate").text(formatDate(currentDate, format, locale));
        tooltip.select("p span#start").text(formatDate(start, format, locale));
        tooltip.select("p span#end").text(formatDate(end, format, locale));
        tooltip.select("p span#unit").text(unit);
        tooltip.select("p span#subunit").text(subUnit);
        tooltip.select("p span#description").text(description);
    }

    /**
     * Funzione che muove il tooltip seguendo lo spostamento del mouse ed aggiusta la posizione quando è vicino ai bordi
     * @param x coordinata x del cursore
     * @param y coordinata y del cursore
     * @private
     */
    private moveTooltip(x: number, y: number){
        if (this.tooltipCollideX(x)){ //se è troppo a destra lo sposta a sinistra del mouse
            x -= 410;
        }

        if (this.tooltipCollideY(y)) {  //se è troppo in basso lo sposta in sopra al mouse
            y-=210;
        }
        d3.select("div div#tooltip")
            .style("left", x + "px")
            .style("top", y + "px");
    }

    /**
     * Funzione che ritorna true se la posizione del mouse è vicina al margine destro
     * @param x coordinata x del cursore
     * @private
     */
    private tooltipCollideX(x: number){
        return 365 + x > window.innerWidth;
    }

    /**
     * Funzione che ritorna true se la posizione del mouse è vicina al margine inferiore
     * @param y coordinata y del cursore
     * @private
     */
    private tooltipCollideY(y: number){
        return 200 + y > window.innerHeight;
    }
}

