import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { TASK_DURATIONS } from '../constants/task-durations';
import { addIcons } from 'ionicons';
import { qrCodeOutline, syncOutline } from 'ionicons/icons';
import { HapticService } from '../services/haptics.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuccessScreenComponent,
    TaskBoxComponent,
    IonIcon,
    IonGrid,
    IonCol,
    IonRow,
  ],
})
export class SensorPage implements OnInit, OnDestroy {
  formattedTime = '00:00';
  success = false;
  remainingSeconds = TASK_DURATIONS.sensor;
  private intervalId: any;
  private orientationHandler = this.onDeviceOrientation.bind(this);

  constructor(
    private router: Router,
    private game: GameService,
    private zone: NgZone,
    private haptic: HapticService,
  ) {}

  ngOnInit() {
    this.formattedTime = this.formatTime(this.remainingSeconds);
    this.startCountdown();
    this.requestOrientationPermission();
    window.addEventListener('deviceorientation', this.orientationHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('deviceorientation', this.orientationHandler);
  }

  onSkip() {
    this.game.skipTask();
    this.stopTimer();
    this.router.navigate(['/charger']);
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private async requestOrientationPermission() {
    const anyOrientationEvent = (window as any).DeviceOrientationEvent;
    if (
      anyOrientationEvent &&
      typeof anyOrientationEvent.requestPermission === 'function'
    ) {
      try {
        await anyOrientationEvent.requestPermission();
      } catch {
        // ignore denial or non support
      }
    }
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.formattedTime = this.formatTime(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        clearInterval(this.intervalId);
        this.game.skipTask();
        this.router.navigate(['/charger']);
      }
    }, 1000);
  }

  private onDeviceOrientation(event: DeviceOrientationEvent) {
    if (event.beta != null && Math.abs(event.beta) > 150 && !this.success) {
      this.zone.run(() => this.completeTask());
    }
  }

  private completeTask() {
    this.success = true;
    this.stopTimer();
    window.removeEventListener('deviceorientation', this.orientationHandler);
    this.game.completeTask();
    this.haptic.vibrate();
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
}
