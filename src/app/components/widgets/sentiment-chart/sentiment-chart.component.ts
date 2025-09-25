import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SentimentData {
  name: string;
  value: number;
  color: string;
}

interface ArcData {
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
  color: string;
  value: number;
  name: string;
}

@Component({
  selector: 'app-sentiment-chart',
  imports: [CommonModule],
  templateUrl: './sentiment-chart.component.html',
  styleUrl: './sentiment-chart.component.css'
})
export class SentimentChartComponent implements OnInit {
  data: SentimentData[] = [
    { name: 'Positif', value: 35, color: '#10B981' },
    { name: 'Neutre', value: 50, color: '#94A3B8' },
    { name: 'Mitigé', value: 10, color: '#F59E0B' },
    { name: 'Négatif', value: 5, color: '#EF4444' }
  ];

  arcs: ArcData[] = [];
  centerX = 150;
  centerY = 150;
  innerRadius = 0;
  outerRadius = 100;

  ngOnInit() {
    this.calculateArcs();
  }

  calculateArcs() {
    const total = this.data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    this.arcs = this.data.map(item => {
      const startAngle = currentAngle;
      const endAngle = currentAngle + (item.value / total) * 360;
      currentAngle = endAngle;

      return {
        startAngle,
        endAngle,
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius,
        color: item.color,
        value: item.value,
        name: item.name
      };
    });
  }

  createPath(arc: ArcData): string {
    const startAngleRad = (arc.startAngle - 90) * Math.PI / 180;
    const endAngleRad = (arc.endAngle - 90) * Math.PI / 180;

    const largeArcFlag = arc.endAngle - arc.startAngle <= 180 ? '0' : '1';

    const x1 = this.centerX + arc.outerRadius * Math.cos(startAngleRad);
    const y1 = this.centerY + arc.outerRadius * Math.sin(startAngleRad);
    const x2 = this.centerX + arc.outerRadius * Math.cos(endAngleRad);
    const y2 = this.centerY + arc.outerRadius * Math.sin(endAngleRad);

    if (arc.innerRadius === 0) {
      // Pie chart
      return `M ${this.centerX} ${this.centerY} L ${x1} ${y1} A ${arc.outerRadius} ${arc.outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    } else {
      // Donut chart
      const x3 = this.centerX + arc.innerRadius * Math.cos(endAngleRad);
      const y3 = this.centerY + arc.innerRadius * Math.sin(endAngleRad);
      const x4 = this.centerX + arc.innerRadius * Math.cos(startAngleRad);
      const y4 = this.centerY + arc.innerRadius * Math.sin(startAngleRad);

      return `M ${x1} ${y1} A ${arc.outerRadius} ${arc.outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${arc.innerRadius} ${arc.innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
    }
  }

  getLabelPosition(arc: ArcData): {x: number, y: number} {
    const angle = (arc.startAngle + arc.endAngle) / 2;
    const angleRad = (angle - 90) * Math.PI / 180;
    const radius = (arc.innerRadius + arc.outerRadius) / 2;

    return {
      x: this.centerX + radius * Math.cos(angleRad),
      y: this.centerY + radius * Math.sin(angleRad)
    };
  }

  trackByName(index: number, item: SentimentData): string {
    return item.name;
  }
}
