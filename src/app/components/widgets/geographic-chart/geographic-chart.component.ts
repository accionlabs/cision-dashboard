import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

interface RegionData {
  name: string;
  value: number;
  intensity: number; // 0-100 for color intensity
  color: string;
  coordinates: [number, number]; // lat, lng for marker placement
}

@Component({
  selector: 'app-geographic-chart',
  imports: [CommonModule],
  templateUrl: './geographic-chart.component.html',
  styleUrl: './geographic-chart.component.css'
})
export class GeographicChartComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | null = null;
  hoveredRegion: string | null = null;

  regions: RegionData[] = [
    { name: 'Île-de-France', value: 1245, intensity: 100, color: '#10B981', coordinates: [48.8566, 2.3522] },
    { name: 'Auvergne-Rhône-Alpes', value: 832, intensity: 67, color: '#34D399', coordinates: [45.7640, 4.8357] },
    { name: 'Provence-Alpes-Côte d\'Azur', value: 721, intensity: 58, color: '#6EE7B7', coordinates: [43.9352, 6.0679] },
    { name: 'Nouvelle-Aquitaine', value: 654, intensity: 53, color: '#9CE9C9', coordinates: [45.7087, 0.6266] },
    { name: 'Occitanie', value: 598, intensity: 48, color: '#C6F6D5', coordinates: [43.6045, 1.4440] },
    { name: 'Hauts-de-France', value: 543, intensity: 44, color: '#D1FAE5', coordinates: [50.6292, 3.0573] },
    { name: 'Grand Est', value: 487, intensity: 39, color: '#DCFCE7', coordinates: [48.6996, 6.1878] },
    { name: 'Pays de la Loire', value: 456, intensity: 37, color: '#ECFDF5', coordinates: [47.4784, -0.5632] },
    { name: 'Bretagne', value: 398, intensity: 32, color: '#F0FDF4', coordinates: [48.2020, -2.9326] },
    { name: 'Normandie', value: 343, intensity: 28, color: '#F7FEF8', coordinates: [49.1829, -0.3707] },
    { name: 'Bourgogne-Franche-Comté', value: 287, intensity: 23, color: '#FBFEFB', coordinates: [47.2805, 5.9996] },
    { name: 'Centre-Val de Loire', value: 234, intensity: 19, color: '#FCFFF9', coordinates: [47.7516, 1.6751] },
    { name: 'Corse', value: 98, intensity: 8, color: '#FEFFFC', coordinates: [42.0396, 9.0129] }
  ];

  maxValue = Math.max(...this.regions.map(r => r.value));

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Initialize the map centered on France
    this.map = L.map('map', {
      center: [46.2276, 2.2137],
      zoom: 6,
      scrollWheelZoom: false
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add markers for each region
    this.regions.forEach(region => {
      const markerSize = 20 + (region.intensity / 100) * 30; // Size based on intensity

      // Create a custom circular marker
      const marker = L.circleMarker(region.coordinates, {
        radius: markerSize / 2,
        fillColor: this.getIntensityColor(region.intensity),
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(this.map!);

      // Add popup with region information
      marker.bindPopup(`
        <div style="text-align: center;">
          <strong>${region.name}</strong><br>
          ${region.value} mentions
        </div>
      `);

      // Add hover effects
      marker.on('mouseover', () => {
        marker.setStyle({
          fillOpacity: 1,
          weight: 3
        });
        this.hoveredRegion = region.name;
      });

      marker.on('mouseout', () => {
        marker.setStyle({
          fillOpacity: 0.8,
          weight: 2
        });
        this.hoveredRegion = null;
      });
    });
  }

  getBarWidth(value: number): string {
    return `${(value / this.maxValue) * 100}%`;
  }

  getIntensityColor(intensity: number): string {
    const alpha = 0.2 + (intensity / 100) * 0.8;
    return `rgba(16, 185, 129, ${alpha})`;
  }

  trackByRegion(index: number, region: RegionData): string {
    return region.name;
  }

  getRegionColor(regionName: string): string {
    const region = this.regions.find(r => r.name === regionName);
    if (region) {
      return this.getIntensityColor(region.intensity);
    }
    return '#e5e7eb'; // default gray color
  }

  getRegionValue(regionName: string): number {
    const region = this.regions.find(r => r.name === regionName);
    return region ? region.value : 0;
  }
}