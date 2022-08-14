import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild, ContentChildren, EventEmitter, Input,
  Output, QueryList, TemplateRef, ViewChild, ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepComponent } from '@components/step/step.component';

@Component({
  standalone: true,
  selector: 'fw-stepper',
  imports: [
    CommonModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  exportAs: 'fwStepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterViewInit {

  showPrevButton = false;
  showNextButton = true;
  defaultButtonLabels = {
    prev: 'Back',
    next: 'Next',
  };
  buttonLabels = { ...this.defaultButtonLabels };
  isErrorPage = false;

  @ContentChildren(StepComponent, { descendants: true })
  steps!: QueryList<StepComponent>;
  @ViewChild('stepContainer', { read: ViewContainerRef })
  stepContainer: ViewContainerRef | undefined;
  @ContentChild('error', { read: TemplateRef })
  errorTemplate!: TemplateRef<unknown> | undefined;
  @ViewChild('defaultErrorTemplate', { read: TemplateRef })
  defaultErrorTemplate!: TemplateRef<unknown>;

  @Input() currentIndex = 0;

  @Output() nextClick = new EventEmitter();
  @Output() prevClick = new EventEmitter();
  @Output() winzardFinish = new EventEmitter();

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  updateButtons(index: number) {
    this.buttonLabels = {
      ...this.defaultButtonLabels,
      ...(this.step?.buttonLabels ?? {}),
    };
    this.showPrevButton = index > 0;
    this.showNextButton = index <= this.steps.length - 1;
    this.cd.detectChanges();
  }

  updateIndex(index: number) {
    if (this.steps?.length && index >= 0 && index < this.steps.length) {
      this.currentIndex = index;
      this.projectContent();
    }
  }

  renderErrorState() {
    if (this.stepContainer) {
      this.stepContainer.clear();
      this.stepContainer.createEmbeddedView(this.errorTemplate ?? this.defaultErrorTemplate);
    }
  }

  next() {
    if (this.step?.stepForm && this.step.stepForm.invalid) {
      return;
    }
    const formData = this.step?.stepForm?.value;
    this.isErrorPage = formData && this.step?.errorChecker && this.step.errorChecker(formData);
    // check if errorChecker expression, and if pass then redirect to error state.
    if (this.isErrorPage) {
      this.renderErrorState();
      return;
    }
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
      this.updateButtons(this.currentIndex);
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
