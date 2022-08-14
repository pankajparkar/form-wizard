import {
  Component, ContentChildren, EventEmitter, Input,
  Output, QueryList, ViewChild, ViewContainerRef,
} from '@angular/core';
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

  @ContentChildren(StepComponent, { descendants: true })
  steps!: QueryList<StepComponent>;
  @ViewChild('stepContainer', { read: ViewContainerRef })
  stepContainer: ViewContainerRef | undefined;

  @Input() currentIndex = 0;

  @Output() onNext = new EventEmitter();
  @Output() onPrev = new EventEmitter();
  @Output() onFinish = new EventEmitter();

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
    if (this.step?.stepForm && this.step.stepForm.invalid) {
      return;
    }
    const updateIndex = this.currentIndex + 1;
    this.updateIndex(this.currentIndex + 1);
    this.onNext.emit(this.step?.stepForm?.value);
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
      this.stepContainer.createEmbeddedView(this.step?.content!);
    }
  }

  get step() {
    return this.steps.get(this.currentIndex);
  }

  ngAfterViewInit() {
    this.projectContent();
    this.steps.changes.subscribe((step) => {
      this.projectContent();
    });
  }
}
