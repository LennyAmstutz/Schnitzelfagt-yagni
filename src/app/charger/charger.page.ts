import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { batteryChargingOutline } from 'ionicons/icons';

import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';

import { GameService } from '../services/game.service';
import { TASK_DURATIONS } from '../constants/task-durations';

import {
  BatteryStatus,
  BatteryStatusResponse,
} from '@awesome-cordova-plugins/battery-status/ngx';

@Component({
  selector: 'app-charger',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIcon,
    SuccessScreenComponent,
    TaskBoxComponent,
  ],
  providers: [BatteryStatus],
  templateUrl: './charger.page.html',
  styleUrls: ['./charger.page.scss'],
})
export class ChargerPage implements OnInit {
  formattedTime = '00:00';
  success = false;
  remainingSeconds: number = TASK_DURATIONS.charger;

  private intervalId: any = null;
  private subscription: any = null;

  charging = false;

  constructor(
    private batteryStatus: BatteryStatus,
    private ngZone: NgZone,
    private router: Router,
    private game: GameService,
  ) {
    addIcons({
      batteryChargingOutline,
    });
  }

  ngOnInit() {
    this.formattedTime = this.formatTime(this.remainingSeconds);
    this.listenToCharging();
    this.startCountdown();
  }

  private listenToCharging() {
    this.subscription = this.batteryStatus
      .onChange()
      .subscribe((status: BatteryStatusResponse) => {
        this.ngZone.run(() => {
          this.charging = status.isPlugged;
          if (this.charging && !this.success) {
            this.success = true;
            this.game.completeTask();
            this.stopAll();
          }
        });
      });
  }

  onSkip() {
    this.game.skipTask();
    this.stopAll();
    this.router.navigate(['/wifi']);
  }

  private startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.formattedTime = this.formatTime(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        this.onSkip();
      }
    }, 1000);
  }

  private stopAll() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
}
