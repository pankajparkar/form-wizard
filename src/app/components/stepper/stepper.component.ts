import { Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';
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
export class StepperComponent {

  backButtonEnabled = false;
  nextButtonEnabled = false;
  startButtonEnabled = true;
  @ContentChildren(StepComponent, { descendants: true }) steps!: QueryList<StepComponent>;
  @ViewChild('stepContainer', { read: ViewContainerRef }) stepContainer: ViewContainerRef | undefined;

  @Input() currentIndex = 0;

  constructor() { }

  updateIndex(index: number) {
    if (this.steps?.length && index >= 0 && index < this.steps.length) {
      this.currentIndex = index;
      this.startButtonEnabled = index === 0;
      this.backButtonEnabled = index > 0;
      this.nextButtonEnabled = index > 0 && index < this.steps.length - 1;
      this.projectContent();
    }
  }

  next() {
    this.updateIndex(this.currentIndex + 1);
  }

  prev() {
    this.updateIndex(this.currentIndex - 1);
  }

  private projectContent() {
    if (this.steps.length && this.stepContainer) {
      this.stepContainer.clear();
      const step = this.steps.get(this.currentIndex);
      this.stepContainer.createEmbeddedView(step?.content!);
    }
  }

  ngAfterViewInit() {
    this.projectContent();
    this.steps.changes.subscribe((step) => {
      console.log('step', step);
      this.projectContent();
    });
  }
}
