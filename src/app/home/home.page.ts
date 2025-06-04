import {Component, ViewChild} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import {LeaderboardComponent} from "../leaderboard/leaderboard.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, LeaderboardComponent, IonButton, RouterLink],
})
export class HomePage {
  constructor() {}
  @ViewChild(LeaderboardComponent) leaderboard!: LeaderboardComponent;

  ionViewWillEnter() {
    if (this.leaderboard) {
      this.leaderboard.loadSchnitzeljagden();
    }
  }
}
