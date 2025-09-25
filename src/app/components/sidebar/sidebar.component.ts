import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Home, Activity, Users, FileText } from 'lucide-angular';

interface MenuItem {
  icon: any;
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly Home = Home;
  readonly Activity = Activity;
  readonly Users = Users;
  readonly FileText = FileText;

  menuItems: MenuItem[] = [
    { icon: this.Home, label: 'Accueil', active: false },
    { icon: this.Activity, label: 'Social Listening', active: false },
    { icon: this.Users, label: 'IP Connect', active: false },
    { icon: this.FileText, label: 'Veille', active: true }
  ];
}
