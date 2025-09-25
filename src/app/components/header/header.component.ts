import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Phone, Mail, Wifi, Users, ChevronDown } from 'lucide-angular';

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
  readonly Wifi = Wifi;
  readonly Users = Users;
  readonly ChevronDown = ChevronDown;
}
