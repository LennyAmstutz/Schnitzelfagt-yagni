import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonLabel,
  IonButtons,
  AlertController,
} from '@ionic/angular/standalone';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonButton,
    IonLabel,
  ],
})

export class SetupPage {
  userName: string = '';
  constructor(
    private router: Router,
    private game: GameService,
  ) {}

  submitName() {
    if (!this.userName.trim()) return;
    this.game.startGame();
    this.router.navigate(['/camera-permission']);
    localStorage.setItem('name', this.userName);
  }

  quit() {
    this.router.navigate(['/home']);
  }
}
