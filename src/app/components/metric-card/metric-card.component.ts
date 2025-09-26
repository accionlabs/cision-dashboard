import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TrendingUp, FileText, Edit, Clock, Euro, Eye, X, ArrowLeft, ArrowRight } from 'lucide-angular';
import { Widget } from '../../models/widget.model';

@Component({
  selector: 'app-metric-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.css'
})
export class MetricCardComponent {
  @Input() widget!: Widget;
  @Input() canMoveUp: boolean = false;
  @Input() canMoveDown: boolean = false;
  @Output() remove = new EventEmitter<string>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();

  // Lucide icons for mapping
  readonly icons = {
    TrendingUp,
    FileText,
    Edit,
    Clock,
    Euro,
    Eye,
    X,
    ArrowLeft,
    ArrowRight
  };

  getIcon(label: string): any {
    if (!label) return this.icons.TrendingUp;
    if (label.includes('retombées')) return this.icons.TrendingUp;
    if (label.includes('supports')) return this.icons.FileText;
    if (label.includes('pages')) return this.icons.Edit;
    if (label.includes('temps')) return this.icons.Clock;
    if (label.includes('valeur')) return this.icons.Euro;
    if (label.includes('occasions')) return this.icons.Eye;
    return this.icons.TrendingUp;
  }

  onRemove(): void {
    this.remove.emit(this.widget.id);
  }

  onMoveUp(): void {
    this.moveUp.emit();
  }

  onMoveDown(): void {
    this.moveDown.emit();
  }

  get config() {
    return this.widget.config || {};
  }

  get value() {
    return this.config['value'];
  }

  get unit() {
    return this.config['unit'];
  }

  get label() {
    return this.config['label'];
  }

  get color() {
    return this.config['color'];
  }
}
