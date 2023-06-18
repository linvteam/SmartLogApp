import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { formatDate, registerLocaleData } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import localeIT from "@angular/common/locales/it";
import * as d3 from 'd3';
import { CumulativeService } from '../../services/cumulative/cumulative.service';
registerLocaleData(localeIT, "it");

/**
 * Classe per la rappresentazione dei dati in un grafico cumulativo
 */
@Component({
    selector: 'app-cumulative-chart',
    templateUrl: './cumulative-chart.component.html',
    styleUrls: ['./cumulative-chart.component.css']
})
export class CumulativeChartComponent {

    /**
     * Codice dell'evento
     */
    private code: string = "";

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
    private readonly dateFormat: string = 'dd/MM/yyyy - HH:mm:ss.SSS';

    /**
     * Locale usato per formattare le date
     */
    private readonly locale: string = "it-IT";

    /**
     * I dati da visualizzare nel grafico
     */
    public records: any[] = [];

    /**
     * Margine del grafico
     */
    private margin: any = { top: 60, right: 30, bottom: 30, left: 65 };

    /**
     * Larghezza del grafico
     */
    private width: number = 1100 - this.margin.left - this.margin.right;

    /**
     * Altezza del grafico
     */
    private height: number = 600 - this.margin.top - this.margin.bottom;

    /**
     * Il grafico da disegnare a schermo
     */
    private svg: any;

    /**
    * Il grafico da disegnare
    */
    private g: any;

    /**
     * Il tooltip mostrato quando si passa sopra un punto
     */
    private tooltip: any;

    /**
     * L'asse x
     */
    private gXAxis: any;

    /**
    * La linea disegnata sul grafico
    */
    private path: any;

    /**
     * I punti disegnati sul grafico
     */
    private dots: any;

    /**
     * L'area colorata sotto la linea del grafico
     */
    private area: any;

    /**
     * Costruttore
     * @param cumulativeService Servizio che ottiene i dati dal backend
     * @param modalService Dialog di errore
     */
    constructor(private cumulativeService: CumulativeService, private modalService: NgbModal) {
    }

    /**
     * Metodo per l'ottenimento del messaggio da visualizzare in caso di mancanza di dati
     */
    public getNoRecordsMessage(): string {
        if (this.code == "")
            return "Seleziona un code per visualizzare il grafico"
        else
            return "Nessuna occorrenza da visualizzare"
    }

    /**
     * Metodo che gestisce il submit del form
     * @param value Valore emesso dall'evento proveniente dal form di header
     */
    public onSubmit(value: any): void {

        const errorHandler = (err: any) => {
            let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
            modal.componentInstance.setup(err.error.message ? err.error.message : "C'è stato un errore nel caricamento dati", () => {
                this.records = [];
                this.code = "";
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
                this.code = ev.body.code;
                this.records = ev.body.records.map((e: any) => {
                    return {
                        instant: new Date(Date.parse(e.instant)),
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
        return formatDate(date, this.dateFormat, this.locale)
    }

    /**
     * Metodo per disegnare il grafico
     * @private
     */
    private drawChart(): void {

        //Pulisco il grafico precedente se c'era
        this.clean();

        //Imposto gli assi e i domini
        const X = d3.map(this.records, d => d.instant);
        const Y = d3.map(this.records, p => p.eventOccurencies);

        const xDomain = d3.extent(X) as Array<Date>;
        const yDomain = d3.extent(Y) as Array<number>;

        const xOffset = (xDomain[1].getTime() - xDomain[0].getTime()) * 0.04
        const yOffset = (yDomain[1] - yDomain[0]) * 0.05

        const offsetDateSx = new Date(xDomain[0]).setTime(xDomain[0].getTime() - xOffset)
        const offsetDateDx = new Date(xDomain[1]).setTime(xDomain[1].getTime() + xOffset)

        const xScale = d3.scaleTime([offsetDateSx, offsetDateDx], [0, this.width]);
        const yScale = d3.scaleLinear([yDomain[0] - yOffset, yDomain[1] + yOffset], [this.height, 0]);

        //Imposto i dati del grafico
        const line = d3.line()
            .x((d: any) => xScale(d.instant))
            .y((d: any) => yScale(d.eventOccurencies))
            .curve(d3.curveStep);

        // append the svg object to the body of the page
        this.svg = d3.select("figure#cumulative-chart")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .call((svg: any) => this.zoom(svg, xScale, yScale));

        const defs = this.svg.append("defs");
        const clipTag = defs.append("clipPath").attr("id", "clip");

        clipTag.append("rect")
            .attr("width", this.width)
            .attr("height", this.height)

        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ")");

        this.g.append('text')
            .attr('class', 'title')
            .attr('x', this.width / 2)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr("transform",
                "translate(0," + -10 + ")")
            .text(`Occorrenze di ${this.code} nel periodo tra ${this.getFormattedDate(this.startDate)} e ${this.getFormattedDate(this.endDate)}`);

        //Creo l'asse X nel grafico
        this.gXAxis = this.g.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(xScale))
            .call((g: any) => g.selectAll(".tick line").clone()
                .attr("y1", -this.height)
                .attr("stroke-opacity", 0.2)
                .attr("class", "grid-line"));

        //Creo l'asse Y nel grafico
        this.g.append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(yScale))
            .call((g: any) => g.selectAll(".tick line").clone()
                .attr("x2", this.width)
                .attr("stroke-opacity", 0.2))

        //Inserico il testo nell'asse Y
        this.g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margin.left)
            .attr("x", 0 - (this.height / 2))
            .attr("dy", "1em")
            .attr("font-size", "1.5em")
            .style("text-anchor", "middle")
            .text("Occorrenze");

        //Inserisco il tooltip per i punti
        this.tooltip = d3.select("figure#cumulative-chart")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "fixed")
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

    /**
     * Funzione di supporto per zoomed(), stabilisce i limiti di zoom
     * @param svg Grafico
     * @param xScale Funzione per scalare l'asse x
     * @param yScale Funzione per scalare l'asse y
     * @private
     */
    private zoom(svg: any, xScale: d3.ScaleTime<number, number, never>, yScale: d3.ScaleLinear<number, number, never>): void {
        svg.call(d3.zoom()
            //limiti del moltiplicatore di zoom/de-zoom, da 0x a infinito
            .scaleExtent([0, Infinity])
            //operazione da eseguire quando si effettua lo zoom/trascinamento
            .on("zoom", (event: any) => this.zoomed(event, yScale, xScale)));
    }

    /**
     * Funzione che implementa la funzionalità di zoom scalando gli assi ed il grafico
     * @param event Evento
     * @param y Funzione per scalare l'asse y
     * @param x Funzione per scalare l'asse x
     * @private
     */
    private zoomed(event: any, y: any, x: any): void {
        let new_x = event.transform.rescaleX(x);
        this.gXAxis.call(d3.axisBottom(new_x))

        const area = d3.area()
            .x((d: any) => new_x(d.instant)).y0(this.height)
            .y1((d: any) => y(d.eventOccurencies))
            .curve(d3.curveStepAfter);

        //ridefinizione di come dev'essere creata la linea con la nuova scala
        const line = d3.line()
            .x((d: any) => new_x(d.x))
            .y((d: any) => y(d.y))
            .curve(d3.curveStepAfter);

        const tickTags: any = d3.select(".xAxis").selectAll(".tick");

        //prendo tutte le linee della griglia, le rimuove e le ridisegno
        //in modo che ci siano anche sulle nuove tacche che si sono formate
        //in seguito allo zoom o al trascinamento
        tickTags.selectAll(".grid-line").remove();
        tickTags.selectAll("line").clone()
            .attr("y1", -this.height)
            .attr("stroke-opacity", 0.2)
            .attr("class", "grid-line");

        //riplotto la parabola
        this.path.attr("d", line(this.records));

        this.dots.attr("cx", (d: any) => new_x(d.instant))
            .attr("cy", (d: any) => y(d.eventOccurencies))

        if (this.area != null) {
            this.area.attr("d", area(this.records))
        }
    }

    /**
     * Metodo per inserire i nuovi dati
     * @param line Linea del grafico
     * @param xScale Funzione per scalare l'asse x
     * @param yScale Funzione per scalare l'asse y
     * @private
     */
    private putNewData(line: d3.Line<[number, number]>, xScale: d3.ScaleTime<number, number, never>, yScale: d3.ScaleLinear<number, number, never>): any {

        const area = d3.area()
            .x((d: any) => xScale(d.instant)).y0(this.height)
            .y1((d: any) => yScale(d.eventOccurencies))
            .curve(d3.curveStepAfter);

        this.path = this.g.append("path")
            .attr("stroke", "#69b3a2").attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round").attr("stroke-width", 1.5)
            .attr("d", line(this.records))
            .attr("clip-path", "url(#clip)")

        if (this.records.length > 1) {
            this.area = this.path.attr("fill", "#8ad875")
                .attr("fill-opacity", 0.4).attr("d", area(this.records));
        }

        //Aggiunto i punti che rappresentano gli istanti
        this.dots = this.g
            .append("g")
            .selectAll("dot")
            .data(this.records)
            .enter()
            .append("circle")
            .attr("cx", (d: any) => xScale(d.instant))
            .attr("cy", (d: any) => yScale(d.eventOccurencies))
            .attr("r", 5)
            .attr("clip-path", "url(#clip)")
            .attr("fill", "#69b3a2");

        //Evento che accade quando passo sopra un punto e mostra il tooltip
        const mouseOver = (e: any, d: any) => {
            this.tooltip.select("p#instant").text("Istante: " + this.getFormattedDate(d.instant))
            this.tooltip.select("p#occurrencies").text("Occorrenze: " + d.eventOccurencies)
            return this.tooltip.style("opacity", 1);
        }

        //Evento che accade quando mi muovo sopra un punto e sposto il tooltip
        const mouseMove = (event: any) => {
            let x = event.clientX;
            let y = event.clientY;
            if (this.tooltipCollideX(x)) { //se troppo a destra, lo sposta a sinistra del mouse
                x -= 130;
            }

            if (this.tooltipCollideY(y)) {  //se troppo in basso, lo sposta in sopra al mouse
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
        this.dots.on("mouseover", mouseOver)
            .on("mousemove", mouseMove)
            .on("mouseout", mouseOut);

        return this.dots;
    }

    /**
     * Metodo che ritorna true se la posizione del mouse è vicina al margine destro
     * @param x coordinata x del cursore
     * @private
     */
    private tooltipCollideX(x: number): boolean {
        return 165 + x > window.innerWidth;
    }

    /**
     * Metodo che ritorna true se la posizione del mouse è vicina al margine inferiore
     * @param y coordinata y del cursore
     * @private
     */
    private tooltipCollideY(y: number): boolean {
        return 120 + y > window.innerHeight;
    }
}