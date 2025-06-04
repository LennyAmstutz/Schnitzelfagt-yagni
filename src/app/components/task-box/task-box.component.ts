import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { home } from 'ionicons/icons';

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
  @Output() skip = new EventEmitter<void>();

  constructor(private route: Router) {}

  goHome() {
    this.route.navigate(['/home']);
  }
}
