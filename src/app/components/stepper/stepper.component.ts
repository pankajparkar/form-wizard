import { Component, ContentChildren, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from '../step/step.component';

@Component({
  standalone: true,
  selector: 'fw-stepper',
  imports: [
    CommonModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  exportAs: 'fwStepper'
})
export class StepperComponent implements OnInit {

  @ContentChildren(StepComponent, { descendants: true }) steps: QueryList<StepComponent> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
