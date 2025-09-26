import { Injectable } from '@angular/core';
import { Widget } from '../models/widget.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private widgetTypes: Record<string, string> = {
    'metric-retombees': 'Retombées',
    'metric-supports': 'Supports',
    'metric-pages': 'Pages surface',
    'metric-temps': "Temps d'antenne",
    'metric-valeur': 'Valeur média',
    'metric-occasions': 'Occasions de voir',
    'wordcloud': 'Nuage de mots-clés',
    'sentiment': 'Tonalité',
    'timeline': 'Chronologie des retombées',
    'media-types': 'Types de médias',
    'geographic': 'Répartition géographique',
    'themes': 'Graphique des thèmes',
    'sources': 'Graphique des sources'
  };

  createWidget(type: string): Widget {
    const id = `${type}-${Date.now()}`;
    const title = this.widgetTypes[type] || `Widget ${type}`;

    // Set default config for metric widgets
    let config: any = undefined;
    if (type.startsWith('metric-')) {
      const metricType = type.replace('metric-', '');
      const metricConfigs: Record<string, any> = {
        'retombees': { value: '2,847', label: 'retombées', color: '#2196F3' },
        'supports': { value: '1,423', label: 'supports', color: '#2196F3' },
        'pages': { value: '3.2', unit: 'millions', label: 'pages surface', color: '#2196F3' },
        'temps': { value: '14h32', label: "temps d'antenne", color: '#2196F3' },
        'valeur': { value: '1.8', unit: 'milliards', label: 'valeur média', color: '#2196F3' },
        'occasions': { value: '425K', label: 'occasions de voir', color: '#2196F3' }
      };
      config = metricConfigs[metricType] || {};
    }

    // Set grid dimensions based on widget type
    let gridCols = 4; // Default to 4 columns (1/3 of 12-column grid)
    let gridRows = 1;

    if (type.startsWith('metric-')) {
      gridCols = 2; // Metric widgets are smaller
      gridRows = 1;
    } else if (type === 'timeline' || type === 'geographic') {
      gridCols = 6; // Timeline and map are wider
      gridRows = 2;
    } else if (type === 'wordcloud' || type === 'themes' || type === 'sources') {
      gridCols = 4;
      gridRows = 2;
    } else {
      gridCols = 4; // Default chart widgets
      gridRows = 2;
    }

    return {
      id,
      type,
      title,
      order: Date.now(),
      isVisible: true,
      isCollapsed: false,
      config,
      gridCols,
      gridRows
    };
  }

  getWidgetCategories() {
    return [
      {
        name: 'Métriques',
        widgets: [
          { type: 'metric-retombees', name: 'Retombées', icon: 'trending-up' },
          { type: 'metric-supports', name: 'Supports', icon: 'file-text' },
          { type: 'metric-pages', name: 'Pages surface', icon: 'edit' },
          { type: 'metric-temps', name: "Temps d'antenne", icon: 'clock' },
          { type: 'metric-valeur', name: 'Valeur média', icon: 'euro' },
          { type: 'metric-occasions', name: 'Occasions de voir', icon: 'eye' }
        ]
      },
      {
        name: 'Graphiques',
        widgets: [
          { type: 'wordcloud', name: 'Nuage de mots-clés', icon: 'cloud' },
          { type: 'sentiment', name: 'Tonalité', icon: 'smile' },
          { type: 'timeline', name: 'Chronologie', icon: 'calendar' },
          { type: 'media-types', name: 'Types de médias', icon: 'layers' },
          { type: 'geographic', name: 'Carte géographique', icon: 'map' },
          { type: 'themes', name: 'Thèmes', icon: 'tag' },
          { type: 'sources', name: 'Sources', icon: 'globe' }
        ]
      }
    ];
  }
}