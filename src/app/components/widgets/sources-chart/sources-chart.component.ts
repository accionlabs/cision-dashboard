import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface SourceData {
  name: string;
  positif: number;
  neutre: number;
  mitige: number;
  negatif: number;
}

@Component({
  selector: 'app-sources-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './sources-chart.component.html',
  styleUrl: './sources-chart.component.css'
})
export class SourcesChartComponent implements OnInit {

  sources: SourceData[] = [
    { name: 'Le Figaro', positif: 75, neutre: 15, mitige: 5, negatif: 5 },
    { name: 'Podcasts Indépendants', positif: 70, neutre: 20, mitige: 5, negatif: 5 },
    { name: 'France 24', positif: 65, neutre: 25, mitige: 7, negatif: 3 },
    { name: 'Franceinfo', positif: 60, neutre: 28, mitige: 8, negatif: 4 },
    { name: 'CNEWS', positif: 55, neutre: 30, mitige: 10, negatif: 5 },
    { name: 'Le 1 des arts', positif: 72, neutre: 20, mitige: 5, negatif: 3 }
  ];

  // Chart configuration
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  legendPosition = 'below';
  xAxisTickFormatting = (value: any) => `${value}%`;

  colorScheme = {
    domain: ['#10B981', '#94A3B8', '#F59E0B', '#EF4444']
  };

  // Transform data for ngx-charts
  chartData: any[] = [];

  filterDetails = {
    period: 'Du 29/06/23 au 20/07/23',
    mediaType: 'Presse, TV',
    detailedSupports: '1240',
    mediaFamily: 'Médias étrangers',
    themes: 'Corporate',
    keywords: 'Usurpis',
    tags: 'a tag, rm cles',
    tonality: 'Positif'
  };

  ngOnInit(): void {
    this.transformData();
  }

  private transformData(): void {
    this.chartData = this.sources.map(source => ({
      name: source.name,
      series: [
        { name: 'Positif', value: source.positif },
        { name: 'Neutre', value: source.neutre },
        { name: 'Mitigé', value: source.mitige },
        { name: 'Négatif', value: source.negatif }
      ]
    }));
  }

  onSelect(event: any): void {
    console.log('Chart selection:', event);
  }

  onActivate(event: any): void {
    console.log('Chart activate:', event);
  }

  onDeactivate(event: any): void {
    console.log('Chart deactivate:', event);
  }
}