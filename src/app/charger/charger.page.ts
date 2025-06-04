import {Component, NgZone, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import {BatteryStatus} from "@awesome-cordova-plugins/battery-status/ngx";
import {BatteryStatusResponse} from "@awesome-cordova-plugins/battery-status";
import {IonIcon} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {batteryChargingOutline} from "ionicons/icons";
import { Router } from '@angular/router';

import { GameService } from '../services/game.service';
import { TASK_DURATIONS } from '../constants/task-durations';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.page.html',
  styleUrls: ['./charger.page.scss'],
  standalone: true,
  providers: [BatteryStatus],
  imports: [
    CommonModule,
    FormsModule,
    SuccessScreenComponent,
    TaskBoxComponent,
    IonIcon,
  ],
})
export class ChargerPage implements OnInit {
  formattedTime = '00:00';
  success = false;
  remainingSeconds = TASK_DURATIONS.charger;
  private intervalId: any;

  constructor(
    private router: Router,
    private game: GameService,
  ) {}
  remainingSeconds = 30;
  charging = false;
  private interval: any = null;

  constructor(
    private batteryStatus: BatteryStatus,
    private ngZone: NgZone,
    private router: Router
  ) {
    addIcons({
      batteryChargingOutline
    });
  }

  ngOnInit() {
    this.listenToCharging();
    this.formattedTime = this.formatTime(this.remainingSeconds);
    this.startCountdown();
  }

  listenToCharging() {
    this.batteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {
      this.ngZone.run(() => {
        this.charging = status.isPlugged;
        if (this.charging && !this.success) {
          this.stopCountdown();
          this.success = true;
        }
      });
    });
  }

  onSkip() {
    this.game.skipTask();
    this.router.navigate(['/wifi']);
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.formattedTime = this.formatTime(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        clearInterval(this.intervalId);
        this.game.skipTask();
        this.router.navigate(['/wifi']);
      }
    }, 1000);
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
}
