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
  formattedTime = '01:30';
  remainingSeconds = 90;
  success = false;

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
    this.startCountdown();
    this.monitorWifi();
  }

  startCountdown() {
    this.interval = setInterval(() => {
      this.remainingSeconds--;

      const m = String(Math.floor(this.remainingSeconds / 60)).padStart(2, '0');
      const s = String(this.remainingSeconds % 60).padStart(2, '0');
      this.formattedTime = `${m}:${s}`;

      if (this.remainingSeconds <= 0) {
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

  stopAll() {
    clearInterval(this.interval);
    clearInterval(this.wifiCheckInterval);

    if (!this.success) {
      this.ngZone.run(() => this.router.navigate(['/finish']));
    }
  }
}
