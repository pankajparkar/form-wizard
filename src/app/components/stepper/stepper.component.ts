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

  currentIndex = 0;
  backButtonEnabled = false;
  nextButtonEnabled = false;
  startButtonEnabled = true;
  @ContentChildren(StepComponent, { descendants: true }) steps: QueryList<StepComponent> | undefined;

  constructor() { }

  updateIndex(index: number) {
    if (this.steps?.length && index >= 0 && index <= this.steps.length) {
      this.currentIndex = index;
      this.startButtonEnabled = index === 0;
      this.backButtonEnabled = index > 0;
      this.nextButtonEnabled = index > 0 && index < this.steps.length;
    }
  }

  next() {
    this.updateIndex(this.currentIndex + 1);
  }

  prev() {
    this.updateIndex(this.currentIndex - 1);
  }

  ngOnInit(): void {
  }

}
