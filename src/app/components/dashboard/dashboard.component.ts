import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, Plus, Search, Info, X, Settings } from 'lucide-angular';
import { MetricCardComponent } from '../metric-card/metric-card.component';
import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { WidgetManagerComponent } from '../widget-manager/widget-manager.component';
import { DashboardNameDialogComponent } from '../dashboard-name-dialog/dashboard-name-dialog.component';
import { Widget } from '../../models/widget.model';
import { DashboardPage } from '../../models/dashboard.model';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    MetricCardComponent,
    ChartWidgetComponent,
    WidgetManagerComponent,
    DashboardNameDialogComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  readonly ChevronDown = ChevronDown;
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Info = Info;
  readonly X = X;
  readonly Settings = Settings;

  dashboardPages: DashboardPage[] = [];
  currentPageId: string | null = null;
  widgets: Widget[] = [];
  showPageDropdown = false;
  showWidgetManager = false;
  showNameDialog = false;

  constructor(private widgetService: WidgetService) {}

  ngOnInit() {
    // Initialize with empty state
  }

  get currentPage(): DashboardPage | undefined {
    return this.dashboardPages.find(p => p.id === this.currentPageId);
  }

  get currentWidgets(): Widget[] {
    const page = this.currentPage;
    if (!page) return [];
    return this.widgets
      .filter(w => page.widgets.includes(w.id) && w.isVisible)
      .sort((a, b) => a.order - b.order);
  }

  handleCreateNewDashboard(name: string) {
    const newPage: DashboardPage = {
      id: `page-${Date.now()}`,
      name: name,
      widgets: []
    };
    this.dashboardPages.push(newPage);
    this.currentPageId = newPage.id;
    this.showNameDialog = false;
  }

  handleSelectPage(pageId: string) {
    this.currentPageId = pageId;
    this.showPageDropdown = false;
  }

  handleAddWidget(type: string) {
    if (!this.currentPage) return;

    const newWidget = this.widgetService.createWidget(type);
    this.widgets.push(newWidget);

    const pageIndex = this.dashboardPages.findIndex(p => p.id === this.currentPageId);
    if (pageIndex !== -1) {
      this.dashboardPages[pageIndex].widgets.push(newWidget.id);
    }

    this.showWidgetManager = false;
  }

  handleRemoveWidget(widgetId: string) {
    const widgetIndex = this.widgets.findIndex(w => w.id === widgetId);
    if (widgetIndex !== -1) {
      this.widgets[widgetIndex].isVisible = false;
    }
  }

  handleToggleCollapse(widgetId: string) {
    const widget = this.widgets.find(w => w.id === widgetId);
    if (widget) {
      widget.isCollapsed = !widget.isCollapsed;
    }
  }

  openNameDialog() {
    this.showNameDialog = true;
  }

  closeNameDialog() {
    this.showNameDialog = false;
  }

  openWidgetManager() {
    this.showWidgetManager = true;
  }

  closeWidgetManager() {
    this.showWidgetManager = false;
  }

  isMetricWidget(widget: Widget): boolean {
    return widget.type.startsWith('metric-');
  }
}
