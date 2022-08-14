import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremiumCalculationService {

  constructor() { }

  calculate(age: number, rate: number, percentage: number) {
    const times = percentage === 0 ? 0 : percentage / 100;
    const baseResult = age * 10 * rate;
    return baseResult + (baseResult * times);
  }
}
