import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Phone, Mail, Signal, Users, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly Search = Search;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Signal = Signal;
  readonly Users = Users;
  readonly ChevronDown = ChevronDown;
}
