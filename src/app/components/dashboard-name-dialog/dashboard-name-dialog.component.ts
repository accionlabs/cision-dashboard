import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-name-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-name-dialog.component.html',
  styleUrl: './dashboard-name-dialog.component.css'
})
export class DashboardNameDialogComponent {
  @Input() isVisible: boolean = false;
  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  name: string = '';

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.name.trim()) {
      this.confirm.emit(this.name.trim());
      this.resetForm();
    }
  }

  handleCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  handleBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.handleCancel();
    }
  }

  private resetForm() {
    this.name = '';
  }

  get isSubmitDisabled(): boolean {
    return !this.name.trim();
  }
}
