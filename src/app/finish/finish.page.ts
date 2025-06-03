import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {SuccessScreenComponent} from "../components/success-screen/success-screen.component";
import {TaskBoxComponent} from "../components/task-box/task-box.component";
import {RouterLink} from "@angular/router";

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
    RouterLink
  ],
})
export class FinishPage {
  totalTime: string = '05:32';
  totalMedals: number = 3;
  totalDistance: number = 1200;

  constructor() {}

  ngOnInit(): void {}
}
