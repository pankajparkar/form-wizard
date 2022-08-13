import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremiumCalculationService {

  constructor() { }

  calculate(age: number, rate: number, premium: string) {
    const precentage = 50 / 100;
    const baseResult = age * 10 * rate;
    return baseResult + (baseResult * precentage);
  }
}
