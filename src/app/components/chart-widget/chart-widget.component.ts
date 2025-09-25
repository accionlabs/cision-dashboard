import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, HelpCircle, Download, Copy, Maximize2, X, ChevronUp, ChevronDown } from 'lucide-angular';
import { Widget } from '../../models/widget.model';
import { WordCloudComponent } from '../widgets/word-cloud/word-cloud.component';
import { SentimentChartComponent } from '../widgets/sentiment-chart/sentiment-chart.component';
import { TimelineChartComponent } from '../widgets/timeline-chart/timeline-chart.component';
import { MediaTypesChartComponent } from '../widgets/media-types-chart/media-types-chart.component';
import { GeographicChartComponent } from '../widgets/geographic-chart/geographic-chart.component';
import { ThemesChartComponent } from '../widgets/themes-chart/themes-chart.component';
import { SourcesChartComponent } from '../widgets/sources-chart/sources-chart.component';

@Component({
  selector: 'app-chart-widget',
  imports: [
    CommonModule,
    LucideAngularModule,
    WordCloudComponent,
    SentimentChartComponent,
    TimelineChartComponent,
    MediaTypesChartComponent,
    GeographicChartComponent,
    ThemesChartComponent,
    SourcesChartComponent
  ],
  templateUrl: './chart-widget.component.html',
  styleUrl: './chart-widget.component.css'
})
export class ChartWidgetComponent {
  @Input() widget!: Widget;
  @Output() toggleCollapse = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  // Lucide icons
  readonly HelpCircle = HelpCircle;
  readonly Download = Download;
  readonly Copy = Copy;
  readonly Maximize2 = Maximize2;
  readonly X = X;
  readonly ChevronUp = ChevronUp;
  readonly ChevronDown = ChevronDown;

  onToggleCollapse(): void {
    this.toggleCollapse.emit(this.widget.id);
  }

  onRemove(): void {
    this.remove.emit(this.widget.id);
  }
}