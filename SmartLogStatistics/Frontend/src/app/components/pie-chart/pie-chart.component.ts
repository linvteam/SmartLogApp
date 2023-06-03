import { Component } from '@angular/core';
import * as d3 from "d3";
import {TotalByFirmwareService} from "../../services/total-by-firmware/total-by-firmware.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpResponse} from "@angular/common/http";
import {ErrorModalComponent} from "../error-modal/error-modal.component";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent{

    public data: any[] = [];

    private modalService?: NgbModal;

    constructor(private totalByFirmware: TotalByFirmwareService) {
        //this.loadData();
        console.log(this.data);
    }

    public loadData(): void {
        this.totalByFirmware.GetTotalByFirmware().subscribe({
            next: (event) => {
                if (event instanceof HttpResponse<any>) {
                    console.log("AAAAAAA");
                    this.data = event.body.firmwareOccurrences;
                    console.log(this.data);
                    this.draw();
                }
            },
            error: (err) => {
                let modal = this.modalService?.open(ErrorModalComponent, { size: 'sm' });
                modal?.componentInstance.setup(err.body.message, () => { this.loadData() });
            }
        });
    }

    private draw(): void {
        
        
        d3.select('#pieChart').selectAll('*').remove();

        const width = 1000;
        const height = 700;
        const radius = (Math.min(width, height) / 2) - 50; //i 50 px hard-coded servono per non far tagliare il grafico e le etichette

        const svg = d3.select('#pieChart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const pieGenerator = d3.pie<any>().value((d: any) => d.eventOccurrences);
        const dataReady = pieGenerator(this.data);

        const arcGenerator = d3.arc<any>()
            .innerRadius(0)
            .outerRadius(radius);

        const labelArc = d3.arc<any>()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 0.6);

        const color = d3.scaleOrdinal()
            .range(["#98abc5",
                "#8a89a6",
                "#7b6888",
                "#6b486b",
                "#a05d56",
                "#d0743c",
                "#ff8c00"]);

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
            .style('fill', (d: any, i: number) => `url(#gradient-${i})`)
            .attr('stroke', 'black')
            .style('stroke-width', '2px')
            .style('opacity', 0.7)
            .on('mouseover', this.handleMouseOver)
            .on('mouseout', this.handleMouseOut);

        slice.append('text')
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
            .selectAll('.line')
            .filter((lineData: any) => lineData === d)
            .style('visibility', 'visible');
    }

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
    }

    private handleClick(event: any, d: any) {
        const currentSlice = d3.select(event.currentTarget);
        const parentNode = currentSlice.node().parentNode;
        const clickedLabel = d3.select(parentNode)
            .selectAll('.firmware')
            .filter((labelData: any) => labelData === d);

        const clickedLine = d3.select(parentNode)
            .selectAll('.line')
            .filter((lineData: any) => lineData === d);

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
    }

}


