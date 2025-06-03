import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-success-screen',
  templateUrl: './success-screen.component.html',
  styleUrls: ['./success-screen.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, NgOptimizedImage],
})
export class SuccessScreenComponent {
  @Input() nextRoute: string = '/';
}
