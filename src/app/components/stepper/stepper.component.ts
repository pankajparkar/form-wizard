import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';
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

  @Output() onNext = new EventEmitter();
  @Output() onPrev = new EventEmitter();
  @Output() onFinish = new EventEmitter();

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
    const updateIndex = this.currentIndex + 1;
    this.updateIndex(this.currentIndex + 1);
    this.onNext.emit();
    if (this.steps.length === updateIndex) {
      this.onFinish.emit();
    }
  }

  prev() {
    this.updateIndex(this.currentIndex - 1);
    this.onPrev.emit();
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
      this.projectContent();
    });
  }
}
