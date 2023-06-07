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

    /**
     * Codice dell'evento
     */
    private Code: string = "";

    /**
     * Data di lower-bound del intervallo temporale preso in esame
     */
    private startDate: Date = new Date();

    /**
     * Data di upper-bound del intervallo temporale preso in esame
     */
    private endDate: Date = new Date();

    /**
     * Formato della data usato per la formattazione
     */
    private readonly dateFormat = 'yyyy/MM/dd - HH:mm:ss.SSS';

    /**
     * Locale usato per formattare le date
     */
    private readonly locale = "it-IT";

    /**
     * Fuso orario usato per formattare le date
     */
    private readonly timezone = "UTC";

    /**
     * I dati da visualizzare nel grafico
     */
    public records: any[] = [];

    /**
     * Il grafico da disegnare a schermo
     */
    private svg: any;

    /**
     * Il tooltip mostrato quando si passa sopra un punto
     */
    private tooltip: any;
    constructor(private cumulativeService: CumulativeService, private modalService: NgbModal) {
    }

    public getNoRecordsMessage(): string {
        if (this.Code == "")
            return "Seleziona un code per visualizzare il grafico"
        else
            return "Nessuna occorrenza da visualizzare"
    }

    /**
     * Funzione invocata alla submit della form di time-code-header
     * @param value
     */
    onSubmit(value: any): void {

        const errorHandler = (err: any) => {
            let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
            modal.componentInstance.setup(err.error.message ? err.error.message : "C'è stato un errore nel caricamento dati", () => {
                this.records = [];
                this.Code = "";
            })
        };

        /**
        * Genera una funzione per la gestione della richiesta HTTP di ottenimento dei dati
        * @returns Una funzione per la gestione della richiesta HTTP di ottenimento dei dati
        */
        const loadData = (ev: any) => {
            if (ev instanceof HttpResponse<any>) {
                this.startDate = new Date(Date.parse(ev.body.start));
                this.endDate = new Date(Date.parse(ev.body.end));
                this.Code = ev.body.code;
                this.records = ev.body.records.map((e: any) => {
                    return {
                        instant: new Date(e.instant),
                        eventOccurencies: e.eventOccurencies
                    }
                });
                this.drawChart()
            }
        }

        this.cumulativeService.GetCumulativeRecords(value.selectedCode, value.startDatetime, value.endDatetime).subscribe(
            {
                next: (ev: any) => loadData(ev),
                error: (ev: any) => errorHandler(ev)
            }
        )
    }

    /**
     * Funzione che ripulisce il grafico e lo resetta
     * @private
     */
    private clean(): void {
        d3.selectAll("figure#cumulative-chart svg").remove();
        d3.selectAll("figure#cumulative-chart .tooltip").remove();
    }

    /**
     * Funzione che ritorna la data formattata secondo il formato, il locale e il fuso orario impostati
     * @param date Data da formattare
     * @returns La data formattata come stringa
     * @private
     */
    private getFormattedDate(date: Date): string {
        return formatDate(date, this.dateFormat, this.locale, this.timezone)
    }

    private drawChart(): void {

        //Pulisco il grafico precedente se c'era
        this.clean();

        let margin = { top: 60, right: 30, bottom: 30, left: 65 },
            width = 1060 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        //Imposto gli assi e i domini
        const X = d3.map(this.records, d => d.instant);
        const Y = d3.map(this.records, p => p.eventOccurencies);

        const xDomain = d3.extent(X) as Array<Date>;
        const yDomain = d3.extent(Y) as Array<Number>;

        const xScale = d3.scaleTime(xDomain, [0, width]);
        const yScale = d3.scaleLinear(yDomain, [height, 0]);

        //Imposto i dati del grafico
        const line = d3.line()
            .x((d: any) => xScale(d.instant))
            .y((d: any) => yScale(d.eventOccurencies));

        // append the svg object to the body of the page
        this.svg = d3.select("figure#cumulative-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + (margin.top) + ")");

        this.svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr("transform",
                "translate(0," + -10 + ")")
            .text(`Occorrenze di ${this.Code} nel periodo tra ${this.getFormattedDate(this.startDate)} e ${this.getFormattedDate(this.endDate)}`);

        //Creo l'asse X nel grafico
        this.svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        //Creo l'asse Y nel grafico
        this.svg.append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(yScale));

        //Crea le linee della griglia (asse X)
        d3.selectAll("g.xAxis g.tick")
            .append("line")
            .attr("class", "gridline")
            .attr("x1", 0)
            .attr("y1", -height)
            .attr("x2", 0)
            .attr("y2", 0)
            .attr("stroke", "#9ca5aecf")
            .attr("stroke-dasharray", "4") 

        // Crea le linee della griglia (asse Y)
        d3.selectAll("g.yAxis g.tick")
            .append("line")
            .attr("class", "gridline")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("stroke", "#9ca5aecf")
            .attr("stroke-dasharray", "4") 

        //Inserico il testo nell'asse Y
        this.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("font-size", "1.5em")
            .style("text-anchor", "middle")
            .text("Occorrenze");

        const area = d3.area()
            .x((d: any) => xScale(d.instant)).y0(height)
            .y1((d: any) => yScale(d.eventOccurencies));
        this.svg.append("path").datum(this.records)
            .attr("stroke", "#69b3a2").attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round").attr("stroke-width", 1.5)
            .attr("d", line).attr("fill", "#69b3a2")
            .attr("fill-opacity", 0.4).attr("d", area);

        //Inserisco il tooltip per i punti
        this.tooltip = d3.select("figure#cumulative-chart")
            .append("div")
            .attr("class","tooltip")
            .style("position", "absolute")
            .style("opacity", 0)
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")

        //Ci aggiungo i campi nel tooltip
        this.tooltip.append("p").attr("id", "instant")

        this.tooltip.append("p").attr("id", "occurrencies")

        // Inserisco i dati nel grafico
        this.putNewData(line, xScale, yScale);

    }

    private putNewData(line: d3.Line<[number, number]>, xScale: d3.ScaleTime<number, number, never>, yScale: d3.ScaleLinear<number, number, never>) {
        this.svg.append("path")
            .datum(this.records)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        //Aggiunto i punti che rappresentano gli istanti
        let dots = this.svg
            .append("g")
            .selectAll("dot")
            .data(this.records)
            .enter()
            .append("circle")
            .attr("cx", (d: any) => xScale(d.instant))
            .attr("cy", (d: any) => yScale(d.eventOccurencies))
            .attr("r", 5)
            .attr("fill", "#69b3a2");

        //Evento che accade quando passo sopra un punto e mostra il tooltip
        const mouseOver = (e: any, d: any) => {
            this.tooltip.select("p#instant").text("Istante: " + this.getFormattedDate(d.instant))
            this.tooltip.select("p#occurrencies").text("Occorrenze: " + d.eventOccurencies)
            return this.tooltip.style("opacity", 1);
        }

        //Evento che accade quando mi muovo sopra un punto e sposto il tooltip
        const mouseMove = (event: any) => {
            let x = event.pageX
            let y = event.pageY
            if (this.tooltipCollideX(x)) { //se è troppo a destra lo sposta a sinistra del mouse
                x -= 130;
            }

            if (this.tooltipCollideY(y)) {  //se è troppo in basso lo sposta in sopra al mouse
                y -= 130;
            }

            return this.tooltip.style("top", (y + 20) + "px").style("left", (x - 100) + "px");
        }

        //Evento che accade quando mi sposto dal punto e nascondo il tooltip
        const mouseOut = () => {
            this.tooltip.style("top", 0 + "px").style("left", 0 + "px")
            return this.tooltip.style("opacity", 0);
        }

        //Imposto gli eventi con il mouse sui punti        
        dots.on("mouseover", mouseOver)
            .on("mousemove", mouseMove)
            .on("mouseout", mouseOut);

        return dots;
    }

    /**
     * Funzione che ritorna true se la posizione del mouse è vicina al margine destro
     * @param x coordinata x del cursore
     * @private
     */
    private tooltipCollideX(x: number): boolean {
        return 165 + x > window.innerWidth;
    }

    /**
     * Funzione che ritorna true se la posizione del mouse è vicina al margine inferiore
     * @param y coordinata y del cursore
     * @private
     */
    private tooltipCollideY(y: number): boolean {
        return 120 + y > window.innerHeight;
    }
}