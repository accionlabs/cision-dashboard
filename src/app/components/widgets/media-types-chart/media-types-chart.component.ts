import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-media-types-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './media-types-chart.component.html',
  styleUrl: './media-types-chart.component.css'
})
export class MediaTypesChartComponent implements OnInit {
  // Chart data
  single: any[] = [];

  // Chart options
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Count';
  showYAxisLabel = false;
  yAxisLabel = 'Media Type';
  showGridLines = true;
  barPadding = 8;
  roundDomains = true;

  colorScheme = {
    domain: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  };

  constructor() {
    // Initialize with sample data
    this.single = [
      { name: 'Web', value: 1245 },
      { name: 'Print', value: 856 },
      { name: 'TV', value: 423 },
      { name: 'Radio', value: 267 },
      { name: 'Social Media', value: 138 }
    ];
  }

  ngOnInit(): void {
    // Data is already initialized in constructor
  }

  // Event handlers
  onSelect(event: any): void {
    console.log('Item clicked', event);
  }

  onActivate(event: any): void {
    console.log('Activate', event);
  }

  onDeactivate(event: any): void {
    console.log('Deactivate', event);
  }

  // Custom formatting for axis
  formatLabel(value: number): string {
    return value.toLocaleString();
  }

  getTotalCount(): number {
    return this.single.reduce((total, item) => total + item.value, 0);
  }
}