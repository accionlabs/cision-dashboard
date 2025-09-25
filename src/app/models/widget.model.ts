export interface Widget {
  id: string;
  type: string;
  title: string;
  order: number;
  isVisible: boolean;
  isCollapsed: boolean;
  config?: Record<string, any>;
}

export type MetricType = 'retombees' | 'supports' | 'pages' | 'temps' | 'valeur' | 'occasions';

export interface WidgetConfig {
  value?: string;
  unit?: string;
  label?: string;
  color?: string;
}