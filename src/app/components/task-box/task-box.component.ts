import { Component, Input } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-box',
  standalone: true,
  imports: [IonicModule, NgIf, RouterLink],
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss'],
})
export class TaskBoxComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() time: string = '00:00';
  @Input() skipRoute: string = '/';

  constructor(
    private alertController: AlertController,
    private router: Router,
  ) {}

  async presentHomeAlert() {
    const alert = await this.alertController.create({
      header: 'Bestätigung',
      message: 'Willst du wirklich zur Startseite zurückkehren?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
        },
        {
          text: 'Ja',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }
}
