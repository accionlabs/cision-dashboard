import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-widget-manager',
  imports: [CommonModule],
  templateUrl: './widget-manager.component.html',
  styleUrl: './widget-manager.component.css'
})
export class WidgetManagerComponent {
  @Input() isVisible: boolean = false;
  @Output() addWidget = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  constructor(private widgetService: WidgetService) {}

  get widgetCategories() {
    return this.widgetService.getWidgetCategories();
  }

  handleAddWidget(type: string) {
    this.addWidget.emit(type);
    this.close.emit();
  }

  handleClose() {
    this.close.emit();
  }

  handleBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.handleClose();
    }
  }

  getWidgetDescription(type: string): string {
    const descriptions: Record<string, string> = {
      'metric-retombees': 'Nombre de retombées médiatiques',
      'metric-supports': 'Nombre de supports différents',
      'metric-pages': 'Pages de surface rédactionnelle',
      'metric-temps': "Temps d'antenne total",
      'metric-valeur': 'Valeur médiatique estimée',
      'metric-occasions': 'Occasions de voir/entendre',
      'wordcloud': 'Visualise les mots-clés les plus fréquents',
      'sentiment': 'Analyse la tonalité des retombées médias',
      'timeline': 'Évolution temporelle des retombées',
      'media-types': 'Répartition par type de média',
      'geographic': 'Localisation géographique des retombées',
      'themes': 'Tonalité par thème de classement',
      'sources': 'Analyse par source de média'
    };
    return descriptions[type] || 'Widget personnalisé';
  }
}
