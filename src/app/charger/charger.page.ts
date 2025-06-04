import { Component, OnInit } from '@angular/core';
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
import { GameService } from '../services/game.service';
import {TASK_DURATIONS} from "../constants/task-durations";

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
  formattedTime = '00:00';
  success = false;
  remainingSeconds = TASK_DURATIONS.charger;
  private intervalId: any;

  constructor(
    private router: Router,
    private game: GameService,
  ) {}

  ngOnInit() {
    this.formattedTime = this.formatTime(this.remainingSeconds);
    this.startCountdown();
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
        this.success = true;
        this.game.completeTask();
      }
    }, 1000);
  }

  private formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
}
