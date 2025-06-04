import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { TASK_DURATIONS } from '../constants/task-durations';

enum GeolocationEnum {
  latitude = 47.027574,
  longitude = 8.300886
}

@Component({
  selector: 'app-geolocation',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TaskBoxComponent,
    SuccessScreenComponent,
  ],
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  formattedTime = '00:00';
  success = false;
  remainingSeconds = TASK_DURATIONS.geolocation;
  private intervalId: any;
  currentDistance = '0';            // <-- Hier die Property für die Distanz
  private cdr = inject(ChangeDetectorRef);

  private watchId: string | undefined;

  constructor(
    private router: Router,
    private game: GameService,
  ) {}

  async ngOnInit() {
    this.startCountdown();
    await this.startWatcher();
  }

  onSkip() {
    this.game.skipTask();
    this.router.navigate(['/distance']);
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.formattedTime = this.formatTime(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        clearInterval(this.intervalId);
        this.game.skipTask();
        this.router.navigate(['/distance']);
      }
    }, 1000);
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  async startWatcher() {
    const watcher = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position) => {
        if (position != null && !this.success) {
          const currentLat = position.coords.latitude;
          const currentLon = position.coords.longitude;

          const distance = this.haversineDistanceToFixedPoint(currentLat, currentLon);
          this.currentDistance = distance.toFixed(2);  // Distanz updaten

          if (distance < 7) {  // Schwellenwert, ab dem Task als erfolgreich gilt
            this.completeTask();
          }

          this.cdr.detectChanges();
        }
      }
    );

    this.watchId = await watcher;
  }

  async completeTask() {
    this.success = true;
    clearInterval(this.intervalId);
    await this.stopWatcher();
  }

  async stopWatcher() {
    if (this.watchId !== undefined) {
      await Geolocation.clearWatch({ id: this.watchId });
    }
  }

  haversineDistanceToFixedPoint(currentLat: number, currentLon: number): number {
    const R = 6371e3; // Erdradius in Metern
    const lat1Rad = currentLat * (Math.PI / 180);
    const lat2Rad = GeolocationEnum.latitude * (Math.PI / 180);
    const deltaLat = (GeolocationEnum.latitude - currentLat) * (Math.PI / 180);
    const deltaLon = (GeolocationEnum.longitude - currentLon) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}
