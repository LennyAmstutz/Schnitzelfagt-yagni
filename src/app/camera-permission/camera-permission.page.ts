import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import {Camera} from '@capacitor/camera';

@Component({
  selector: 'app-camera-permission',
  templateUrl: './camera-permission.page.html',
  styleUrls: ['./camera-permission.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class CameraPermissionPage{

  constructor(private router: Router) {}


  async requestCameraPermission() {
    const result = await Camera.requestPermissions();
    if (result.camera === 'granted') {
      this.router.navigate(['/geolocation-permission']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
