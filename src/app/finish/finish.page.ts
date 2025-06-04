import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PointService} from "../services/point.service";

import { IonicModule } from '@ionic/angular';
import { SuccessScreenComponent } from '../components/success-screen/success-screen.component';
import { TaskBoxComponent } from '../components/task-box/task-box.component';
import { RouterLink } from '@angular/router';
import {GameService} from "../services/game.service";
import {CapacitorHttp} from "@capacitor/core";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
  ],
})
export class FinishPage {
  totalTime: string = '00:00';
  totalMedals: number = 0;
  totalPotatoes: number = 0;
  totalDistance: number = 0;
  private pointService = inject(PointService)
  schnitzelJagd: any;

  constructor(private game: GameService) {}

  ngOnInit(): void {
    this.totalTime = this.game.getElapsedTime();
    this.totalMedals = this.game.medalCount;
    this.totalPotatoes = this.game.potatoCount;
    this.pointService.saveSchnitzeljagd();
    this.getSchnitzeljagdData();
    this.postSchnitzeljagdData();
  }

  getSchnitzeljagdData(){
    const schnitzeljagden = JSON.parse(localStorage.getItem('schnitzeljagden') || '[]');
    if (schnitzeljagden.length > 0) {
      this.schnitzelJagd = schnitzeljagden[schnitzeljagden.length - 1];
    }
  }

  async postSchnitzeljagdData() {
    const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';
    const body = `entry.1860183935=${localStorage.getItem('name')}` +
      `&entry.564282981=${this.totalMedals}` +
      `&entry.1079317865=${this.totalPotatoes}` +
      `&entry.985590604=${this.totalTime}`;
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};

    const options = {
      url: url,
      headers: headers,
      data: body
    }

    const response = await CapacitorHttp.post(options);
    console.log('RESPONSE STATUS POST', response.status)
    console.log(response)
  }
}
