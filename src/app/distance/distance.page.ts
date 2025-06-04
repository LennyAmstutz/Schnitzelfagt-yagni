import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { TASK_DURATIONS } from '../constants/task-durations';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuccessScreenComponent,
    TaskBoxComponent,
  ],
})
export class DistancePage implements OnInit, OnDestroy {
  formattedTime = '00:00';
  success = false;
  remainingSeconds = TASK_DURATIONS.distance; // z.B. 10 Sekunden
  private intervalId: any;
  distanceRemaining = 10; // Meter
  private watchId: string | undefined;
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  private startLat: number | null = null;
  private startLon: number | null = null;

  constructor(
    private router: Router,
    private game: GameService,
  ) {}

  async ngOnInit() {
    this.formattedTime = this.formatTime(this.remainingSeconds);
    await this.initStartPosition();
    this.startCountdown();
    await this.startPositionWatcher();
  }

  ngOnDestroy() {
    this.stopTimer();
    this.stopWatcher();
  }

  async initStartPosition() {
    try {
      const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      this.startLat = position.coords.latitude;
      this.startLon = position.coords.longitude;
    } catch (e) {
      console.error('Startposition konnte nicht ermittelt werden', e);
    }
  }

  onSkip() {
    this.game.skipTask();
    this.stopTimer();
    this.stopWatcher();
    this.router.navigate(['/qr']);
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.zone.run(() => {
        this.remainingSeconds--;
        this.formattedTime = this.formatTime(this.remainingSeconds);
        this.cdr.detectChanges();

        if (this.remainingSeconds <= 0 && !this.success) {
          this.game.skipTask();
          this.stopWatcher();
          this.router.navigate(['/qr']);
        }
      });
    }, 1000);
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  async startPositionWatcher() {
    this.watchId = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        if (err) {
          console.error('Watch error:', err);
          return;
        }

        if (position && this.startLat !== null && this.startLon !== null && !this.success) {
          const dist = this.calculateDistance(
            this.startLat,
            this.startLon,
            position.coords.latitude,
            position.coords.longitude
          );

          this.zone.run(() => {
            this.distanceRemaining = Math.max(0, 10 - dist);
            this.cdr.detectChanges();

            if (dist >= 10) {
              this.completeTask();
            }
          });
        }
      }
    );
  }

  async stopWatcher() {
    if (this.watchId) {
      await Geolocation.clearWatch({ id: this.watchId });
      this.watchId = undefined;
    }
  }

  async completeTask() {
    this.zone.run(() => {
      this.success = true;
      this.stopTimer();
      this.stopWatcher();
    });
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
