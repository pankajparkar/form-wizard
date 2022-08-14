import { Injectable } from '@angular/core';
import { BaseWizard } from '../models/base-wizard.model';

@Injectable({
  providedIn: 'root'
})
export class FormWizardService<T> {

  // TODO: Figure out how generics can be used here properly
  // wizard = {} as T & BaseWizard;
  wizard = {
    formId: Math.round(Math.random() * 10000),
    submited: false,
  } as any;

  constructor() { }

  setDetails(value: T): void {
    // Figure out how generics can be used here properly
    this.wizard.userDetails = value;
  }

  getDetails(): T {
    return this.wizard;
  }

  submit(): void {
    this.wizard.submited = true;
  }
}
