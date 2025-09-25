import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WordItem {
  text: string;
  size: number;
  weight: number;
}

@Component({
  selector: 'app-word-cloud',
  imports: [CommonModule],
  templateUrl: './word-cloud.component.html',
  styleUrl: './word-cloud.component.css'
})
export class WordCloudComponent {
  words: WordItem[] = [
    { text: 'actualités', size: 48, weight: 900 },
    { text: 'france', size: 36, weight: 700 },
    { text: 'médias', size: 32, weight: 600 },
    { text: 'journal', size: 30, weight: 600 },
    { text: 'télévision', size: 28, weight: 500 },
    { text: 'émission', size: 26, weight: 500 },
    { text: 'radio', size: 24, weight: 400 },
    { text: 'presse', size: 24, weight: 400 },
    { text: 'interview', size: 22, weight: 400 },
    { text: 'reportage', size: 20, weight: 400 },
    { text: 'information', size: 20, weight: 400 },
    { text: 'ministre', size: 18, weight: 300 },
    { text: 'gouvernement', size: 18, weight: 300 },
    { text: 'politique', size: 16, weight: 300 },
    { text: 'économie', size: 16, weight: 300 },
    { text: 'société', size: 14, weight: 300 },
    { text: 'culture', size: 14, weight: 300 },
    { text: 'sport', size: 14, weight: 300 },
    { text: 'région', size: 12, weight: 300 },
    { text: 'décision', size: 12, weight: 300 }
  ];

  getWordStyle(word: WordItem) {
    return {
      'font-size': `${word.size}px`,
      'font-weight': word.weight,
      'opacity': 0.4 + (word.size / 48) * 0.6,
      'color': '#4A5568'
    };
  }

  trackByText(index: number, word: WordItem): string {
    return word.text;
  }
}
