import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {Geolocation} from "@capacitor/geolocation";

@Component({
  selector: 'app-geolocation-permission',
  templateUrl: './geolocation-permission.page.html',
  styleUrls: ['./geolocation-permission.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class GeolocationPermissionPage{
  constructor(private router: Router) {}

  async requestGeolocationPermission() {
    const result = await Geolocation.requestPermissions();
    if(result.location === "granted") {
      this.router.navigate(['/geolocation']);
    }else {
      this.router.navigate(['/home']);
    }
  }
}
