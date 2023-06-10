import { Component } from '@angular/core';
import { TotalByCodeService } from "../../services/total-by-code/total-by-code.service";
import * as d3 from "d3";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ErrorModalComponent } from "../error-modal/error-modal.component";
import { FormControl, FormGroup } from "@angular/forms";

/**
 * Classe per la rappresentazione dei dati in un istogramma
 */
@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent{

  /**
   * Variabile contenente i valori della frequenza dei vari codici
   * @protected
   */
  protected x: number[];

  /**
   * Variabile contenente i nomi dei vari codici
   * @private
   */
  private y: string[];

  /**
   * Variabile che contiene l'ordine originale dei dati della frequenza per utilizzarla quando non si usa nessun ordinamento
   * @private
   */
  private xOriginal: number[];

  /**
   * Variabile che contiene l'ordine originale dei codici per utilizzarla quando non si usa nessun ordinamento
   * @private
   */
  private yOriginal: string[];

  /**
   * Minimo (0) e massimo delle frequenza
   * @private
   */
  private xDomain: any;

  /**
   * Larghezza totale dell'svg
   * @private
   */
  private readonly width: number;

  /**
   * Spessore di ogni singola barra
   * @private
   */
  private readonly barHeight: number;

  /**
   * Il service che fornisce i dati
   * @private
   */
  private totalByCodeService: TotalByCodeService;

  /**
   * Il dialog che serve per segnalare errori
   * @private
   */
  private modalService: NgbModal;

  /**
   * Margine superiore dell'svg
   * @private
   */
  private readonly marginTop: number;

  /**
   * Margine destro dell'svg
   * @private
   */
  private readonly marginRight: number;

  /**
   * Margine inferiore dell'svg
   * @private
   */
  private readonly marginBottom: number;

  /**
   * Margine sinistro dell'svg
   * @private
   */
  private readonly marginLeft: number;

  /**
   * Scala per posizionare i valori rispetto all'asse orizzontale
   * @private
   */
  private xScale: any;

  /**
   * Scala per posizionare i codici sull'asse verticale
   * @private
   */
  private yScale: any;

  /**
   * Distanza fra una barra e l'altra
   * Importante: È un valore compreso fra 0 e 1 in modo da rappresentare una percentuale
   * @private
   */
  private readonly yPadding: number;

  /**
   * Range di valori presenti sull'asse x
   * @private
   */
  private xRange: number[];

  /**
   * Altezza totale dell'svg
   * @private
   */
  private height: number;

  /**
   * Range di valori dell'asse y
   * @private
   */
  private yRange: number[];

  /**
   * L'effettivo asse x
   * @private
   */
  private xAxis: any;

  /**
   * L'effettivo asse y
   * @private
   */
  private yAxis: any;

  /**
   * L'effettivo svg
   * @private
   */
  private svg: any;

  /**
   * Il form group contenente il form di ordinamento dei dati
   * @protected
   */
  protected sortForm: any;

  /**
   * Costruisce il componente inizializzando le variabili utili a stabilire le dimensioni delle varie parti del grafico
   * @param totalByCode Il service per ottenere il numero di eventi (per codice) nell'intervallo selezionato
   * @param modal Il pop-up per segnalare un errore nel fetch dei dati dall'API
   */
  constructor(private totalByCode: TotalByCodeService, private modal: NgbModal) {
    this.sortForm = new FormGroup({sortSelection: new FormControl("0")});
    this.x = [];
    this.y = [];
    this.xOriginal = [];
    this.yOriginal = [];
    this.totalByCodeService = totalByCode;
    this.modalService = modal;

    this.xDomain = [];

    this.width = 1500;
    this.barHeight = 50;

    this.marginTop = 40;
    this.marginRight = 0;
    this.marginBottom = 0;
    this.marginLeft = 100;

    this.yPadding = 0.1; //valore compreso fra 0 e 1

    this.height=0;
    this.xRange=[];
    this.yRange=[];

  }

  /**
   * Metodo che imposta i valori necessari a disegnare il grafico secondo i dati attuali
   * e lo disegna
   */
  private drawChart(): void{

    this.deleteChart();

    this.xDomain = [0, Math.max(...this.x)];

    this.height = ((this.y.length) * this.barHeight) + this.marginTop + this.marginBottom;

    this.xRange = [this.marginLeft, this.width - this.marginRight - 7];
    this.yRange = [this.marginTop, this.height - this.marginBottom];

    this.xScale = d3.scaleLinear(this.xDomain, this.xRange);
    this.yScale = d3.scaleBand()
        .domain(this.y)
        .range(this.yRange)
        .padding(this.yPadding);

    const xAxisTicks = this.xScale.ticks(15).filter((tick:any)=> Number.isInteger(tick));
    this.xAxis =  d3.axisTop(this.xScale)
        .tickValues(xAxisTicks)
        .tickFormat((d) => d3.format("d")(d as number));
    this.yAxis = d3.axisLeft(this.yScale).tickSizeOuter(0);


    this.svg = d3.select("figure#histogram-chart")
        .insert("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("viewBox", [0, 0, this.width, this.height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("background-color", "#f00")

    this.svg.append("g")
        .attr("transform", `translate(0,${this.marginTop})`)
        .call(this.xAxis)
        .style('font-size', '17px')
        .style('font-weight', 'bold');


    const seed =Math.random()*360;
    this.svg.append("g")
        .selectAll("path")
        .data(d3.range(this.x.length))
        .join("path")
        .attr("d", (i: number) => {
          const x = this.xScale(0);
          const y = this.yScale(this.y[i]);
          const width = this.xScale(this.x[i]) - this.xScale(0);
          const height = this.yScale.bandwidth();
          const radius = 5;
          return `  M ${x},${y}
                          H ${x + width - radius}    
                          Q ${x + width},${y} ${x + width},${y + radius}
                          V ${y + height - radius}    
                          Q ${x + width},${y + height} ${x + width - radius},${y + height}
                          H ${x}    V ${y} Z  `;
        })
        .attr("fill", (d: any, i:number) => `hsl(${seed+(i*137.51)}deg 50% 50%)`)
        .style("opacity", 0.8);



    this.svg.append("g")
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 17)
        .attr('font-weight', 'bold')
        .selectAll("text")
        .data(d3.range(this.x.length))
        .join("text")
        .attr("x", (i: any) => this.xScale(this.x[i]))
        .attr("y", (i: any) => this.yScale(this.y[i]) + this.yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text((i: number) => this.x[i])
        .call((text: any) => text.filter((i:any) => this.xScale(this.x[i]) - this.xScale(0) < 20) // short bars
            .attr("dx", +4)
            .attr("fill", "#000")
            .attr("text-anchor", "start"));


    this.svg.append("g")
        .attr("transform", `translate(${this.marginLeft},0)`)
        .call(this.yAxis)
        .style('font-size', '17px')
        .style('font-weight', 'bold');
  }

  /**
   * Genera una funzione per la gestione della richiesta HTTP di ottenimento dei dati
   * @returns Una funzione per la gestione della richiesta HTTP di ottenimento dei dati
   */
  private updateData(): any {
    return (event: any) => {
      if(event.body != undefined) {
        this.x = event.body.codeOccurences.map((l: any) => l.eventOccurrences);
        this.y = event.body.codeOccurences.map((l: any) => l.code);
        this.xOriginal = [...this.x];
        this.yOriginal = [...this.y];
        this.drawChart();
      }
    };
  }

  /**
   * Metodo utilizzato per la rimozione del grafico
   * @private
   */
  private deleteChart() : void {d3.select("figure#histogram-chart svg").remove();}

  /**
   * Genera una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento dei dati
   * @returns Una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento dei dati
   */
  private errorHandler(): any {
    return (err: any) => {
      let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
      modal.componentInstance.setup(err.status + " " + err.error.message, () => {
        this.x = [];
        this.y = [];
        this.deleteChart();
      });
    }
  }

  /**
   * Metodo che gestisce il submit del form
   * @param value Valore emesso dall'evento proveniente dal form di header
   */
  public onSubmit(value: any): void {
    if(value.startDatetime != null && value.endDatetime != null){
      this.totalByCodeService.GetTotalByCode(value.startDatetime, value.endDatetime).subscribe({
        next:this.updateData(),
        error: this.errorHandler()
      });

      this.sortForm.reset({sortSelection: "0"});
    }
  }

  /**
   * Metodo che ordina i dati
   * @protected
   */
  protected sortValues(): void {
    const type = this.sortForm.value.sortSelection;

    if(type==0){
      this.x = [...this.xOriginal];
      this.y = [...this.yOriginal];

      this.drawChart()
      return;
    }
    const compare = ( a: any, b:any ) => {
      if(type%2!=0){
        if ( a.code < b.code ){
          return (-1)*type;
        }
        if ( a.code > b.code ){
          return (1)*type;
        }
        return 0;
      } else {
        if ( a.value < b.value ){
          return (-1)*type;
        }
        if ( a.value > b.value ){
          return (1)*type;
        }
        return 0;
      }
    }

    const temp = this.x.map((v: number, i: number) => {
      return { code: this.y[i], value: v }
    });
    temp.sort(compare);

    this.x = temp.map((l: any) => l.value);
    this.y = temp.map((l: any) => l.code);

    this.drawChart();
  }

}
