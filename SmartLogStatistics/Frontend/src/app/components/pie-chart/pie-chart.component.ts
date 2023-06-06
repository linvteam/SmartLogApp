import { Component } from '@angular/core';
import * as d3 from "d3";
import {TotalByFirmwareService} from "../../services/total-by-firmware/total-by-firmware.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorModalComponent} from "../error-modal/error-modal.component";

/**
 * Classe per la rappresentazione dei dati in un grafico a torta
 */
@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent{

    /**
     * Dati da rappresentare nel grafico
     */
    private data: any[] = [];

    /**
     * Costruisce un oggetto per generare un grafico a torta
     * @param totalByFirmwareService Servizio che ottiene i dati dal backend
     * @param modalService Dialog di errore
     */
    constructor(private totalByFirmwareService: TotalByFirmwareService, private modalService: NgbModal) {  }

    /**
     * Genera una funzione per la gestione della richiesta HTTP di ottenimento dei dati
     * @returns Una funzione per la gestione della richiesta HTTP di ottenimento dei dati
     */
    private updateData(): any {
        return (event: any) => {
            if(event.body != undefined) {
                this.data = event.body.firmwareOccurrences;
                this.draw();
            }
        };
    }

    /**
     * Genera una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento dei dati
     * @returns Una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento dei dati
     */
    private errorHandler(): any {
        return (err: any) => {
            let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
            modal.componentInstance.setup("Non è stato possibile ottenere i dati", () => {
                this.data = [];
            });
        }
    }

    /**
     * Metodo per disegnare il grafico
     * @private
     */
    private draw(): void {

        d3.select('#pieChart').selectAll('*').remove();

        const width = 1000;
        const height = 700;
        const radius = (Math.min(width, height) / 2) - 80; //gli 80 px hard-coded servono per non far tagliare il grafico e le etichette

        const svg = d3.select('#pieChart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const pieGenerator = d3.pie<any>().value((d: any) => d.eventOccurrences);
        const dataReady = pieGenerator(this.data);

        dataReady.sort((a: any, b: any) => {
            return b.data.eventOccurrences - a.data.eventOccurrences;
        });

        const arcGenerator = d3.arc<any>()
            .innerRadius(0)
            .outerRadius(radius);

        const labelArc = d3.arc<any>()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 0.6);

        const color = d3.scaleOrdinal()
            .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"]);


        const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"];
        
        svg.selectAll('whatever')
            .data(dataReady)
            .enter()
            .append('linearGradient')
            .attr('id', (d: any, i: number) => `gradient-${i}`)
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 0)
            .selectAll('stop')
            .data((d: any) => [
                {offset: '0%', color: color(d.data.firmware)},
                {offset: '100%', color: '#ffffff'}
            ])
            .enter()
            .append('stop')
            .attr('offset', (d: any) => d.offset)
            .attr('stop-color', (d: any) => d.color);

        const slice = svg.selectAll('.arc')
            .data(dataReady)
            .enter()
            .append('g')
            .attr('class', 'arc')
            .on('click', this.handleClick);

        slice.append('path')
            .attr('d', arcGenerator)
            .style('fill', (d: any, i: number) => {
                if (dataReady.length === colors.length + 1 && i === dataReady.length - 1) {
                    return colors[1];
                } else {
                    return colors[i % colors.length];
                }
            })
            .attr('stroke', 'black')
            .style('stroke-width', '2px')
            .style('opacity', 0.7)
            .on('mouseover', this.handleMouseOver)
            .on('mouseout', this.handleMouseOut);

        const labelPercentageGroup = slice.append('g')
            .attr('class', 'label-percentage-group');

        labelPercentageGroup.append('text')
            .attr('class', 'firmware')
            .attr('transform', (d: any) => {
                const centroid = labelArc.centroid(d);
                const midAngle = Math.atan2(centroid[1], centroid[0]);
                const labelX = Math.cos(midAngle) * (radius + 40);
                const labelY = Math.sin(midAngle) * (radius + 40);
                return `translate(${labelX},${labelY})`;
            })
            .style('text-anchor', (d: any) => {
                const centroid = labelArc.centroid(d);
                const midAngle = Math.atan2(centroid[1], centroid[0]);
                return Math.cos(midAngle) >= 0 ? 'start' : 'end';
            })
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text((d: any) => d.data.firmware)
            .style('visibility', 'hidden');

        labelPercentageGroup.append('text')
            .attr('class', 'percentage')
            .attr('transform', (d: any) => {
                const centroid = labelArc.centroid(d);
                const midAngle = Math.atan2(centroid[1], centroid[0]);
                const labelX = Math.cos(midAngle) * (radius + 40);
                const labelY = Math.sin(midAngle) * (radius + 40) + 16;
                return `translate(${labelX},${labelY})`;
            })
            .style('text-anchor', (d: any) => {
                const centroid = labelArc.centroid(d);
                const midAngle = Math.atan2(centroid[1], centroid[0]);
                return Math.cos(midAngle) >= 0 ? 'start' : 'end';
            })
            .style('font-size', '10px')
            .style('visibility', 'hidden')
            .text((d: any) => {
                const percentage = (d.data.eventOccurrences / this.data.reduce((sum: number, d: any) => sum + d.eventOccurrences, 0)) * 100;
                return `${percentage.toFixed(2)}%`;
            });

        slice.append('path')
            .attr('d', (d: any) => {
                const [x, y] = labelArc.centroid(d);
                const midAngle = Math.atan2(y, x);
                const startX = Math.cos(midAngle) * (radius + 10);
                const startY = Math.sin(midAngle) * (radius + 10);
                const endX = Math.cos(midAngle) * (radius + 30);
                const endY = Math.sin(midAngle) * (radius + 30);
                return `M ${startX},${startY} L ${endX},${endY}`;
            })
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .style('stroke-width', '1px')
            .style('visibility', 'hidden');
    }

    /**
     * Metodo per la gestione dell' hovering
     * @param event Evento di hovering
     * @param d Dati associati all'elemento in cui si verifica l'hovering
     * @private
     */
    private handleMouseOver(event: any, d: any) {
        const currentSlice = d3.select(event.currentTarget);
        currentSlice.style('opacity', 1.0);

        const parentNode = event.currentTarget.parentNode;
        d3.select(parentNode)
            .selectAll('.firmware')
            .filter((labelData: any) => labelData === d)
            .style('visibility', 'visible')
            .style('opacity', 1.0)

        d3.select(parentNode)
            .selectAll('.percentage')
            .filter((labelData: any) => labelData === d)
            .style('visibility', 'visible')
            .style('opacity', 1.0)

        d3.select(parentNode)
            .selectAll('.line')
            .filter((lineData: any) => lineData === d)
            .style('visibility', 'visible');
    }

    /**
     * Metodo per la gestione del mouseout
     * @param event Evento di mouseout
     * @param d Dati associati all'elemento in cui si verifica il mouseout
     * @private
     */
    private handleMouseOut(event: any, d: any) {
        const currentSlice = d3.select(event.currentTarget);
        currentSlice.style('opacity', 0.7);

        const parentNode = event.currentTarget.parentNode;
        d3.select(parentNode)
            .selectAll('.firmware')
            .filter((labelData: any) => labelData === d)
            .style('visibility', (labelData: any) => {
                if (labelData.clicked) {
                    return 'visible';
                } else {
                    return 'hidden';
                }
            })
            .style('opacity', (labelData: any) => {
                if (labelData.clicked) {
                    return 1.0;
                } else {
                    return 0.7;
                }
            });

        d3.select(parentNode)
            .selectAll('.line')
            .filter((lineData: any) => lineData === d)
            .style('visibility', (lineData: any) => {
                if (lineData.clicked) {
                    return 'visible';
                } else {
                    return 'hidden';
                }
            });

        d3.select(parentNode)
            .selectAll('.percentage')
            .filter((lineData: any) => lineData === d)
            .style('visibility', (lineData: any) => {
                if (lineData.clicked) {
                    return 'visible';
                } else {
                    return 'hidden';
                }
            });
    }

    /**
     * Metodo per la gestione del click
     * @param event Evento in cui si effettua il click
     * @param d Dati associati all'elemento in cui si verifica il click
     * @private
     */
    private handleClick(event: any, d: any) {
        const currentSlice = d3.select(event.currentTarget);
        const parentNode = currentSlice.node().parentNode;
        const clickedLabel = d3.select(parentNode)
            .selectAll('.firmware')
            .filter((labelData: any) => labelData === d);

        const clickedLine = d3.select(parentNode)
            .selectAll('.line')
            .filter((lineData: any) => lineData === d);

        const clickedPercentage = d3.select(parentNode)
            .selectAll('.percentage')
            .filter((labelData: any) => labelData === d);

        d.clicked = !d.clicked;
        clickedLabel.style('visibility', (labelData: any) => {
            if (labelData.clicked) {
                return 'visible';
            } else {
                return 'hidden';
            }
        });

        clickedLine.style('visibility', (lineData: any) => {
            if (lineData.clicked) {
                return 'visible';
            } else {
                return 'hidden';
            }
        });

        clickedPercentage.style('visibility', (percentageData: any) => {
            if (percentageData.clicked) {
                return 'visible';
            } else {
                return 'hidden';
            }
        });
    }

    /**
     * Metodo che gestisce il submit del form 
     * @param value Valore emesso dall'evento proveniente dal form di header
     */
    public onSubmit(value: any) {
        this.totalByFirmwareService.GetTotalByFirmware(value.startDatetime, value.endDatetime, value.selectedCode).subscribe({
            next:this.updateData(),
            error: this.errorHandler()
        });
    }
    
}


