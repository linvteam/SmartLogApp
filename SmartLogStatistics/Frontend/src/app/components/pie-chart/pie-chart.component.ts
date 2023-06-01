import { Component, OnInit } from '@angular/core';
import { select, arc, pie, scaleOrdinal } from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    this.createPieChart();
  }

  private createPieChart(): void {
    const data = [
      {label: 'Firmware 1', value: 50},
      {label: 'Firmware 2', value: 30},
      {label: 'Firmware 3', value: 20},
      {label: 'Firmware 4', value: 20},
      {label: 'Firmware 5', value: 2},
      {label: 'Firmware 6', value: 2},
      {label: 'Firmware 7', value: 20},
      {label: 'Firmware 8', value: 10},
      {label: 'Firmware 9', value: 2},
      {label: 'Firmware 10', value: 2},
    ];

    const width = 900;
    const height = 700;
    const radius = (Math.min(width, height) / 2) - 50; //i 50 px hard-coded servono per non far tagliare il grafico e le etichette

    const svg = select('#pieChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pieGenerator = pie<any>().value((d: any) => d.value);
    const dataReady = pieGenerator(data);

    const arcGenerator = arc<any>()
        .innerRadius(0)
        .outerRadius(radius);

    const labelArc = arc<any>()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.6);

    const color = scaleOrdinal()
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
          {offset: '0%', color: color(d.data.label)},
          {offset: '100%', color: '#ffffff'}
        ])
        .enter()
        .append('stop')
        .attr('offset', (d: any) => d.offset)
        .attr('stop-color', (d: any) => d.color);

    /**svg.selectAll('whatever')
     .data(dataReady)
     .enter()
     .append('path')
     .attr('d', arcGenerator)
     .style('fill', (d: any, i: number) => `url(#gradient-${i})`)
     .attr('stroke', 'black')
     .style('stroke-width', '2px')
     .style('opacity', 0.7);

     const total = dataReady.reduce((sum: number, d: any) => sum + d.data.value, 0);
     const average = total / dataReady.length;

     svg.selectAll('whatever')
     .data(dataReady)
     .enter()
     .append('path')
     .attr('d', (d: any) => {
                const [x, y] = labelArc.centroid(d);
                const midAngle = Math.atan2(y, x);
                const startX = Math.cos(midAngle) * (radius + 10);
                const startY = Math.sin(midAngle) * (radius + 10);
                const endX = d.data.value > 0.5 * average ? Math.cos(midAngle) * (radius + 30) : startX;
                const endY = d.data.value > 0.5 * average ? Math.sin(midAngle) * (radius + 30) : startY;
                return `M ${startX},${startY} L ${endX},${endY} L`;
            })
     .attr('fill', 'none')
     .attr('stroke', 'black')
     .style('stroke-width', '1px');

     svg.selectAll('whatever')
     .data(dataReady)
     .enter()
     .append('text')
     .text((d: any) => {
                if (d.data.value > 0.2*average) {
                    return d.data.label;
                } else {
                    return '';
                }
            })
     .attr('transform', (d: any) => {
                const centroid = labelArc.centroid(d);
                const midAngle = Math.atan2(centroid[1], centroid[0]);
                const labelX = Math.cos(midAngle) * (radius + 40); // Adjust the label position along the radial line
                const labelY = Math.sin(midAngle) * (radius + 40); // Adjust the label position along the radial line
                return `translate(${labelX},${labelY})`;
            })
     .style('text-anchor', (d: any) => {
                const centroid = labelArc.centroid(d);
                const midAngle = Math.atan2(centroid[1], centroid[0]);
                return Math.cos(midAngle) >= 0 ? 'start' : 'end';
            })
     .style('font-size', '12px')
     .style('font-weight', 'bold');
     */

    const slice = svg.selectAll('.arc')
        .data(dataReady)
        .enter()
        .append('g')
        .attr('class', 'arc');

    slice.append('path')
        .attr('d', arcGenerator)
        .style('fill', (d: any, i: number) => `url(#gradient-${i})`)
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .on('mouseover', this.handleMouseOver)
        .on('mouseout', this.handleMouseOut);

    slice.append('text')
        .attr('class', 'label')
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
        .text((d: any) => d.data.label)
        .style('visibility', 'hidden');

  }

  private handleMouseOver(event: any, d: any) {
    const currentSlice = select(event.currentTarget);
    currentSlice.style('opacity', 1.0);

    const parentNode = event.currentTarget.parentNode;
    select(parentNode)
        .selectAll('.label')
        .filter((labelData: any) => labelData === d)
        .style('visibility', 'visible');
  }

  private handleMouseOut(event: any, d: any) {
    const currentSlice = select(event.currentTarget);
    currentSlice.style('opacity', 0.7);

    const parentNode = event.currentTarget.parentNode;
    select(parentNode)
        .selectAll('.label')
        .filter((labelData: any) => labelData === d)
        .style('visibility', 'hidden');
  }

}

