import {Component, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-charts',
  templateUrl: './d3-charts.component.html',
  styleUrls: [ './d3-charts.component.scss' ]
})
export class D3ChartsComponent implements OnInit  {
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;

  @Input() deathData: any;

  constructor() {}

  ngOnInit() {
    this.renderPiechart();
    console.log('deathData: ', this.deathData);
  }

  renderPiechart() {
    const dataset: any = [
      { label: 'death', count: this.deathData.deaths },
      { label: 'recovery', count: this.deathData.recovered },
      { label: 'active', count: (this.deathData.confirmed - this.deathData.deaths - this.deathData.recovered) }
    ];

    const width = 100;
    const height = 100;
    const radius: number = Math.min(width, height) / 2;

    const color: any = d3.scaleOrdinal(d3.schemeCategory10).range(['#000', '#5ea758', '#d43403']);

    const element: any = this.chartContainer.nativeElement;

    // Create element
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Define the radius
    const arc: any = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Define start and end angles of the segments
    const pie = d3.pie()
      .value((d: any) => {
        return d.count;
      })
      .sort(null);

    // Render the chart
    const path = svg.selectAll('path')
      .data(pie(dataset))
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', (d: any, i) => {
        console.log('chart: ', d.data);
        return color(d.data.label);
      });
  }
}
