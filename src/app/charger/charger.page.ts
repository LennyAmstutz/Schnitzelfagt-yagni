import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.page.html',
  styleUrls: ['./charger.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SuccessScreenComponent,
    TaskBoxComponent,
  ],
})
export class ChargerPage implements OnInit {
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
