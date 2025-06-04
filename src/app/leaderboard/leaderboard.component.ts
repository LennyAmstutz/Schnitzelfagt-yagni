import {Component, inject, OnInit} from '@angular/core';
import {IonCardContent, IonCol, IonGrid, IonIcon, IonRow} from "@ionic/angular/standalone";
import {PointService} from "../services/point.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],

  imports: [
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class LeaderboardComponent {
  private pointSerivce = inject(PointService)
  rows: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadSchnitzeljagden();
  }

  loadSchnitzeljagden() {
    const schnitzeljagden = JSON.parse(localStorage.getItem('schnitzeljagden') || '[]');
    this.rows = schnitzeljagden.reverse().slice(0, 15);
  }
}
