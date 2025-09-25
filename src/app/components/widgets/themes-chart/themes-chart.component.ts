import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface ThemeData {
  theme: string;
  positif: number;
  neutre: number;
  mitige: number;
  negatif: number;
}

@Component({
  selector: 'app-themes-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './themes-chart.component.html',
  styleUrl: './themes-chart.component.css'
})
export class ThemesChartComponent implements OnInit {

  themes: ThemeData[] = [
    { theme: 'Technologie', positif: 70, neutre: 20, mitige: 5, negatif: 5 },
    { theme: 'Politique', positif: 60, neutre: 25, mitige: 10, negatif: 5 },
    { theme: 'Économie', positif: 50, neutre: 30, mitige: 15, negatif: 5 },
    { theme: 'Environnement', positif: 65, neutre: 20, mitige: 10, negatif: 5 },
    { theme: 'Santé', positif: 55, neutre: 30, mitige: 10, negatif: 5 },
    { theme: 'Éducation', positif: 45, neutre: 35, mitige: 15, negatif: 5 },
    { theme: 'Sports', positif: 60, neutre: 25, mitige: 10, negatif: 5 },
    { theme: 'Culture', positif: 70, neutre: 20, mitige: 5, negatif: 5 }
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

  colorScheme = {
    domain: ['#10B981', '#94A3B8', '#F59E0B', '#EF4444']
  };

  // Transform data for ngx-charts
  chartData: any[] = [];

  ngOnInit(): void {
    this.transformData();
  }

  private transformData(): void {
    this.chartData = this.themes.map(theme => ({
      name: theme.theme,
      series: [
        { name: 'Positif', value: theme.positif },
        { name: 'Neutre', value: theme.neutre },
        { name: 'Mitigé', value: theme.mitige },
        { name: 'Négatif', value: theme.negatif }
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