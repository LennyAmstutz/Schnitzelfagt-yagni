import {Component, NgZone, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import {BatteryStatus} from "@awesome-cordova-plugins/battery-status/ngx";
import {BatteryStatusResponse} from "@awesome-cordova-plugins/battery-status";
import {IonIcon} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {batteryChargingOutline} from "ionicons/icons";

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
  formattedTime = '00:30';
  success = false;
  remainingSeconds = 30;
  charging = false;
  private interval: any = null;

  constructor(private batteryStatus: BatteryStatus, private ngZone: NgZone) {
    addIcons({
      batteryChargingOutline
    })
  }

  ngOnInit() {
    this.listenToCharging();
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

  startCountdown() {
    if (this.interval !== null) return;

    this.interval = setInterval(() => {
      if (this.success) {
        this.stopCountdown();
        return;
      }

      this.remainingSeconds--;
      const m = String(Math.floor(this.remainingSeconds / 60)).padStart(2, '0');
      const s = String(this.remainingSeconds % 60).padStart(2, '0');
      this.formattedTime = `${m}:${s}`;

      if (this.remainingSeconds <= 0) {
        this.stopCountdown();
      }
    }, 1000);
  }

  stopCountdown() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
