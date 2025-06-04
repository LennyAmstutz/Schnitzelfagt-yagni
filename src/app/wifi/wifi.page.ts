import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { wifiOutline } from 'ionicons/icons';

import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';

import { GameService } from '../services/game.service';
import { TASK_DURATIONS } from '../constants/task-durations';

// Zugriff auf das globale Cordova-Plugin
declare var WifiWizard2: any;

@Component({
  selector: 'app-wifi',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    SuccessScreenComponent,
    TaskBoxComponent,
  ],
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
  providers: [],
})
export class WifiPage implements OnInit {
  formattedTime = '00:00';
  success = false;
  remainingSeconds: number = TASK_DURATIONS.wifi;
  private intervalId: any = null;
  private wifiCheckInterval: any = null;

  targetSSID = 'ICT-BLJ';
  wasConnected = false;
  wasDisconnected = false;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private game: GameService,
  ) {
    addIcons({
      wifiOutline,
    });
  }

  ngOnInit() {
    this.formattedTime = this.formatTime(this.remainingSeconds);

    this.startCountdown();
    this.monitorWifi();
  }

  onSkip() {
    this.game.skipTask();
    this.router.navigate(['/finish']);
    this.stopAll();
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.formattedTime = this.formatTime(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        this.stopAll();
        this.game.skipTask();
        this.router.navigate(['/finish']);
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
              console.log('✅ Mit Ziel-WLAN verbunden');
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
      } catch {
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

  private stopAll() {
    // Stoppe Countdown
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    // Stoppe WiFi-Monitoring
    if (this.wifiCheckInterval !== null) {
      clearInterval(this.wifiCheckInterval);
      this.wifiCheckInterval = null;
    }
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
}
