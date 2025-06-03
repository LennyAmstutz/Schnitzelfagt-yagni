import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';

@Component({
  selector: 'app-geolocation',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TaskBoxComponent,
    SuccessScreenComponent,
  ],
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage {
  formattedTime = '00:10';
  success = false;
  remainingSeconds = 10;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.remainingSeconds--;
      const m = String(Math.floor(this.remainingSeconds / 60)).padStart(2, '0');
      const s = String(this.remainingSeconds % 60).padStart(2, '0');
      this.formattedTime = `${m}:${s}`;

      if (this.remainingSeconds <= 0) {
        clearInterval(interval);
        this.success = true;
      }
    }, 1000);
  }
}
