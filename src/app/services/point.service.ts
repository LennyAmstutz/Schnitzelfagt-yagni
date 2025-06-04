import { Injectable } from '@angular/core';
import {GameService} from "../services/game.service";

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private game: GameService) { }

  saveSchnitzeljagd() {
    const name = localStorage.getItem('name');
    const countMedals = this.game.medalCount;
    const countPotatoes = this.game.potatoCount;
    const startTime = parseInt(localStorage.getItem('startTime') || '0');
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;

    const schnitzeljagd = {
      name: name,
      countMedalien: countMedals,
      countPotatos: countPotatoes,
      duration: duration,
      date: formattedDate
    };

    let schnitzeljagden = JSON.parse(localStorage.getItem('schnitzeljagden') || '[]');
    schnitzeljagden.push(schnitzeljagd);
    localStorage.setItem('schnitzeljagden', JSON.stringify(schnitzeljagden));
  }
}
