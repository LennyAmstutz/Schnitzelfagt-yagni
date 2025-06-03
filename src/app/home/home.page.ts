import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import {LeaderboardComponent} from "../leaderboard/leaderboard.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, LeaderboardComponent, IonButton],
})
export class HomePage {
  constructor() {}
}
