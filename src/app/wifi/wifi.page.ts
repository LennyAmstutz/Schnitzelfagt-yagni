import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import {IonIcon} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {wifiOutline} from "ionicons/icons";
import { Router } from '@angular/router';


declare var WifiWizard2: any;

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuccessScreenComponent,
    TaskBoxComponent,
    IonIcon,
  ],
})
export class WifiPage implements OnInit {
  formattedTime = '00:00';
  success = false;
  remainingSeconds = TASK_DURATIONS.wifi;
  private intervalId: any;

  constructor(
    private router: Router,
    private game: GameService,
  ) {}

  targetSSID = 'ICT-BLJ';
  wasConnected = false;
  wasDisconnected = false;

  private interval: any = null;
  private wifiCheckInterval: any = null;

  constructor(private ngZone: NgZone, private router: Router) {
    addIcons({
      wifiOutline
    })
  }

  ngOnInit() {
    this.formattedTime = this.formatTime(this.remainingSeconds);
    this.startCountdown();
    this.monitorWifi();
  }

  onSkip() {
    this.game.skipTask();
    this.router.navigate(['/finish']);
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;

      this.formattedTime = this.formatTime(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        clearInterval(this.intervalId);
        this.game.skipTask();
        this.router.navigate(['/finish']);
        this.stopAll();
      }
    }, 1000);
  }

  monitorWifi() {
    this.wifiCheckInterval = setInterval(async () => {
      try {
        const ssidRaw: string = await WifiWizard2.getConnectedSSID();
        const ssid = ssidRaw.replace(/"/g, '');

        this.ngZone.run(() => {
          if (ssid === this.targetSSID) {
            if (!this.wasConnected) {
              this.wasConnected = true;
              console.log('✅ Verbunden mit Ziel-WLAN');
            }
          } else {
            if (this.wasConnected && !this.wasDisconnected) {
              this.wasDisconnected = true;
              console.log('✅ Verbindung getrennt');
            }
          }

          if (this.wasConnected && this.wasDisconnected && !this.success) {
            this.success = true;
            this.stopAll();
          }
        });
      } catch (err) {
        this.ngZone.run(() => {
          if (this.wasConnected && !this.wasDisconnected) {
            this.wasDisconnected = true;
            console.log('✅ Trennung erkannt');
          }

          if (this.wasConnected && this.wasDisconnected && !this.success) {
            this.success = true;
            this.stopAll();
          }
        });
      }
    }, 2000);
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
}
