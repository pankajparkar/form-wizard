import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild, ContentChildren, EventEmitter, Input,
  Output, QueryList, TemplateRef, ViewChild, ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepComponent } from '@components/step/step.component';
import { StepErrorDirective } from '@directives/step-error.directive';
import { ErrorStepHeaderDirective } from '@directives/error-step-header.directive';

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

  @ContentChildren(StepComponent, { descendants: true })
  steps!: QueryList<StepComponent>;
  @ViewChild('stepContainer', { read: ViewContainerRef })
  stepContainer: ViewContainerRef | undefined;
  @ViewChild('stepHeader', { read: ViewContainerRef })
  stepHeader: ViewContainerRef | undefined;
  @ContentChild(StepErrorDirective)
  errorTemplate!: StepErrorDirective | undefined;
  @ContentChild(ErrorStepHeaderDirective)
  errorHeaderTemplate!: ErrorStepHeaderDirective | undefined;
  @ViewChild('defaultErrorTemplate', { read: TemplateRef })
  defaultErrorTemplate!: TemplateRef<unknown>;

  @Input() currentIndex = 0;

  @Output() nextClick = new EventEmitter();
  @Output() prevClick = new EventEmitter();
  @Output() winzardFinish = new EventEmitter();

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  updateButtons(index: number, isErrorState = false) {
    this.buttonLabels = {
      ...this.defaultButtonLabels,
      ...(this.step?.buttonLabels ?? {}),
    };
    this.showPrevButton = index > 0;
    this.showNextButton = index <= this.steps.length - 1 && !isErrorState;
    this.cd.detectChanges();
  }

  updateIndex(index: number) {
    if (this.steps?.length && index >= 0 && index < this.steps.length) {
      this.currentIndex = index;
      this.projectContent();
    }
  }

  renderErrorState() {
    if (this.stepContainer && this.stepHeader) {
      this.stepContainer.clear();
      this.stepHeader.clear();
      this.stepContainer.createEmbeddedView(this.errorTemplate?.template ?? this.defaultErrorTemplate);
      this.stepHeader.createEmbeddedView(this.errorHeaderTemplate!.template);
      this.updateButtons(this.currentIndex, true);
    }
  }

  next() {
    if (this.step?.stepForm && this.step.stepForm.invalid) {
      return;
    }
    const formData = this.step?.stepForm?.value;
    // check if errorChecker expression, and if pass then redirect to error state.
    if (formData && this.step?.errorChecker && this.step.errorChecker(formData)) {
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
    if (this.steps.length && this.stepContainer && this.stepHeader) {
      this.stepContainer.clear();
      this.stepHeader.clear();
      this.stepContainer.createEmbeddedView(this.step?.content!);
      this.stepHeader.createEmbeddedView(this.step!.stepHeader.template);
      this.updateButtons(this.currentIndex);
    }
  }

  get step() {
    return this.steps.get(this.currentIndex);
  }

  ngAfterViewInit() {
    this.projectContent();
    // TODO: unsubscribe event
    this.steps.changes.subscribe((step) => {
      this.projectContent();
    });
  }
}
