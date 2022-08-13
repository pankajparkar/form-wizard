import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremiumCalculationService {

  constructor() { }

  calculate(age: number, premium: string) {
    const precentage = 50;
    const basedOnAge = age * 10;
    return basedOnAge + (basedOnAge * precentage / 100);
  }
}
