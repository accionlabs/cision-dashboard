import { Component, OnInit, EnvironmentInjector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-timeline-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './timeline-chart.component.html',
  styleUrl: './timeline-chart.component.css'
})
export class TimelineChartComponent implements OnInit {
  // Inject the EnvironmentInjector for ngx-charts tooltips
  private injector = inject(EnvironmentInjector);

  // Chart data
  multi: any[] = [];

  // Chart options
  view: [number, number] = [700, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Count';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
  };

  constructor() {
    // Initialize with sample data
    this.multi = [
      {
        name: 'Articles',
        series: [
          { name: 'Jun', value: 45 },
          { name: 'Jul', value: 52 },
          { name: 'Aug', value: 67 },
          { name: 'Sep', value: 72 },
          { name: 'Oct', value: 64 }
        ]
      },
      {
        name: 'Mentions',
        series: [
          { name: 'Jun', value: 120 },
          { name: 'Jul', value: 135 },
          { name: 'Aug', value: 156 },
          { name: 'Sep', value: 167 },
          { name: 'Oct', value: 152 }
        ]
      }
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
}