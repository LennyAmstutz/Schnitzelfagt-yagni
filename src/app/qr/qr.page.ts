import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import { GameService } from '../services/game.service';
import { TASK_DURATIONS } from '../constants/task-durations';

import { HapticService } from '../services/haptics.service';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    CommonModule,
    FormsModule,
    SuccessScreenComponent,
    TaskBoxComponent,
  ],
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  formattedTime = '00:00';
  success = false;
  remainingSeconds = TASK_DURATIONS.qr;
  private intervalId: any;
  private predefinedSequence = 'M335@ICT-BZ';
  private startTime: number = 0;

  constructor(
    private router: Router,
    private game: GameService,
    private haptic: HapticService,
  ) {}

  ngOnInit() {
    this.startTime = Date.now();
    this.formattedTime = this.formatTime(this.remainingSeconds);
    this.startCountdown();
  }

  onSkip() {
    this.game.skipTask();
    this.router.navigate(['/sensor']);
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.formattedTime = this.formatTime(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        clearInterval(this.intervalId);
        this.game.skipTask();
        this.router.navigate(['/sensor']);
      }
    }, 1000);
  }

  async scanBarcode() {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });
      const scanned = result.ScanResult?.trim();
      if (scanned === this.predefinedSequence) {
        this.success = true;
        clearInterval(this.intervalId);
        await this.haptic.vibrate();
      }
    } catch (err) {
      console.error('Barcode scan failed', err);
    }
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
}
