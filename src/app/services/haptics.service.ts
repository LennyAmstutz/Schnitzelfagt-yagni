import { Injectable } from '@angular/core';
import { Haptics } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root',
})
export class HapticService {
  constructor() {}

  async vibrate(): Promise<void> {
    await Haptics.vibrate();
  }
}
