# Chart Widgets Usage Example

This document shows how to use all available chart widget components including Geographic, Themes, Sources, Timeline, and MediaTypes charts.

## Geographic Chart Component

### Basic Usage
```html
<app-geographic-chart></app-geographic-chart>
```

### Component Features:
- French regional distribution visualization
- Color-coded intensity mapping based on mention volume
- Bar chart representation of all French regions
- Interactive region data with tooltips
- Responsive design with gradient legend
- Sample data covering all major French regions from Île-de-France to Corsica

## Themes Chart Component

### Basic Usage
```html
<app-themes-chart></app-themes-chart>
```

### Component Features:
- Horizontal stacked bar chart for sentiment analysis by theme
- Eight theme categories: Technology, Politics, Economy, Environment, Health, Education, Sports, Culture
- Four sentiment categories: Positive, Neutral, Mixed, Negative
- Color-coded sentiment visualization
- Interactive tooltips with percentage breakdowns
- Legend showing all sentiment types

## Sources Chart Component

### Basic Usage
```html
<app-sources-chart></app-sources-chart>
```

### Component Features:
- Media source sentiment analysis visualization
- Horizontal stacked bars showing sentiment distribution per source
- Eight major French media sources included
- Percentage scale for easy comparison
- Filter information panel with collapsible details
- Interactive tooltips and hover effects

## Timeline Chart Component

### Basic Usage
```html
<app-timeline-chart></app-timeline-chart>
```

### With Custom Properties
```html
<app-timeline-chart
  title="Custom Timeline"
  height="350px">
</app-timeline-chart>
```

### Component Features:
- Line/area chart showing data trends over time
- Interactive tooltips with data points
- Responsive design that adapts to container size
- Sample data covering the last 3 months
- Two data series: Articles and Mentions
- Smooth line curves with area fill
- Professional styling with hover effects

## Media Types Chart Component

### Basic Usage
```html
<app-media-types-chart></app-media-types-chart>
```

### With Custom Properties
```html
<app-media-types-chart
  title="Media Distribution"
  height="450px">
</app-media-types-chart>
```

### Component Features:
- Horizontal bar chart for easy comparison
- Five media categories: Web, Print, TV, Radio, Social Media
- Interactive legend showing counts and percentages
- Total count display in header
- Color-coded bars with hover effects
- Responsive layout for different screen sizes
- Detailed tooltips showing counts and percentages

## Integration with Existing Dashboard

Both components can be integrated into the existing widget system by:

1. **Adding to Widget Manager**: Update the widget types to include these new chart options
2. **Widget Factory Integration**: Add cases for timeline-chart and media-types-chart widgets
3. **Chart Widget Wrapper**: Use the existing `app-chart-widget` wrapper for consistent styling and functionality

### Example Integration in Dashboard:
```html
<!-- In dashboard.component.html widgets render area -->
<app-geographic-chart
  *ngIf="widget.type === 'geographic-chart'"
  [widget]="widget">
</app-geographic-chart>

<app-themes-chart
  *ngIf="widget.type === 'themes-chart'"
  [widget]="widget">
</app-themes-chart>

<app-sources-chart
  *ngIf="widget.type === 'sources-chart'"
  [widget]="widget">
</app-sources-chart>

<app-timeline-chart
  *ngIf="widget.type === 'timeline-chart'"
  [widget]="widget">
</app-timeline-chart>

<app-media-types-chart
  *ngIf="widget.type === 'media-types-chart'"
  [widget]="widget">
</app-media-types-chart>
```

## Technical Details

### Dependencies:
- Chart.js v4.5.0
- ng2-charts v8.0.0
- Angular v19.2.0

### File Structure:
```
src/app/components/widgets/
├── geographic-chart/
│   ├── geographic-chart.component.ts
│   ├── geographic-chart.component.html
│   └── geographic-chart.component.css
├── themes-chart/
│   ├── themes-chart.component.ts
│   ├── themes-chart.component.html
│   └── themes-chart.component.css
├── sources-chart/
│   ├── sources-chart.component.ts
│   ├── sources-chart.component.html
│   └── sources-chart.component.css
├── timeline-chart/
│   ├── timeline-chart.component.ts
│   ├── timeline-chart.component.html
│   └── timeline-chart.component.css
├── media-types-chart/
│   ├── media-types-chart.component.ts
│   ├── media-types-chart.component.html
│   └── media-types-chart.component.css
└── index.ts (exports all components)
```

### Component APIs:

**GeographicChartComponent**:
- `regions: RegionData[]` - Array of French regions with mention data
- `maxValue: number` - Maximum value for bar scaling
- `getBarWidth(value: number): string` - Returns percentage width for bars
- `getIntensityColor(intensity: number): string` - Returns color with alpha for intensity
- `trackByRegion(index: number, region: RegionData): string` - TrackBy function for performance

**ThemesChartComponent**:
- `themes: ThemeData[]` - Array of theme sentiment data
- `colors: SentimentColors` - Color mapping for sentiment types
- `trackByTheme(index: number, theme: ThemeData): string` - TrackBy function for performance

**SourcesChartComponent**:
- `sources: SourceData[]` - Array of media sources with sentiment data
- `colors: SentimentColors` - Color mapping for sentiment types
- `percentageScale: number[]` - Scale values for percentage display
- `trackBySource(index: number, source: SourceData): string` - TrackBy function for performance

**TimelineChartComponent**:
- `@Input() title: string` - Chart title (default: "Timeline Chart")
- `@Input() height: string` - Chart height (default: "300px")

**MediaTypesChartComponent**:
- `@Input() title: string` - Chart title (default: "Media Types Distribution")
- `@Input() height: string` - Chart height (default: "400px")
- `mediaTypesData: MediaTypeData[]` - Array of media type data
- `getTotalCount(): number` - Returns total count of all media types

Both components implement proper cleanup in `ngOnDestroy()` to prevent memory leaks.