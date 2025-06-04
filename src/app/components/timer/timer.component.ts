import { Component, Input, OnInit } from '@angular/core';
import { interval, map, takeWhile } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
})
export class TimerComponent implements OnInit {
  @Input() totalSeconds!: number;
  minutes: number | undefined;
  seconds: number | undefined;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const countdown$ = interval(1000).pipe(
      map(() => --this.totalSeconds),
      takeWhile((seconds) => seconds >= 0),
    );

    countdown$.subscribe((seconds) => {
      this.minutes = Math.floor(seconds / 60);
      this.seconds = seconds - this.minutes * 60;
    });
  }
}
