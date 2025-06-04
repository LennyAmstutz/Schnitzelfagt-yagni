import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import { RouterLink } from '@angular/router';
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TaskBoxComponent,
    SuccessScreenComponent,
    RouterLink,
  ],
})
export class FinishPage {
  totalTime: string = '00:00';
  totalMedals: number = 0;
  totalPotatoes: number = 0;
  totalDistance: number = 0;

  constructor(private game: GameService) {}

  ngOnInit(): void {
    this.totalTime = this.game.getElapsedTime();
    this.totalMedals = this.game.medalCount;
    this.totalPotatoes = this.game.potatoCount;
  }
}
