import {
  AfterViewInit,
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
export class StepperComponent implements AfterViewInit {

  backButtonEnabled = false;
  nextButtonEnabled = false;
  startButtonEnabled = true;

  @ContentChildren(StepComponent, { descendants: true })
  steps!: QueryList<StepComponent>;
  @ViewChild('stepContainer', { read: ViewContainerRef })
  stepContainer: ViewContainerRef | undefined;

  @Input() currentIndex = 0;

  @Output() nextClick = new EventEmitter();
  @Output() prevClick = new EventEmitter();
  @Output() winzardFinish = new EventEmitter();

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
    const formData = this.step?.stepForm?.value;
    const updateIndex = this.currentIndex + 1;
    this.updateIndex(this.currentIndex + 1);
    this.nextClick.emit(formData);
    if (this.steps.length === updateIndex) {
      this.winzardFinish.emit();
    }
  }

  prev() {
    this.updateIndex(this.currentIndex - 1);
    this.prevClick.emit();
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
