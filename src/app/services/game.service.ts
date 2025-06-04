import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private startTime: number | null = null;
  medalCount = 0;
  potatoCount = 0;

  startGame() {
    this.startTime = Date.now();
    this.medalCount = 0;
    this.potatoCount = 0;
  }

  getElapsedTime(): string {
    if (!this.startTime) return '00:00';
    const diff = Date.now() - this.startTime;
    const totalSeconds = Math.floor(diff / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  completeTask() {
    this.medalCount++;
  }

  skipTask() {
    this.potatoCount++;
  }
}
