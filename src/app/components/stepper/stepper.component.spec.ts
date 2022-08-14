import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepComponent } from '@components/step/step.component';
import { StepHeaderDirective } from '@directives/step-header.directive';

import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  @Component({
    selector: 'fw-test-comp',
    standalone: true,
    imports: [
      StepperComponent,
      StepComponent,
      StepHeaderDirective
    ],
    template: `
      <fw-stepper #stepper="fwStepper">
        <fw-step [errorChecker]="errorChecker">
          <ng-template fwStepHeader> Test 1!</ng-template>
          Test 1
        </fw-step>
        <fw-step>
          <ng-template fwStepHeader>Test 2!</ng-template>
          Test 2
        </fw-step>
        <fw-step>
          <ng-template fwStepHeader>Test 3!</ng-template>
          Test 3
        </fw-step>
      </fw-stepper>
    `
  })
  class TestComponent {
    @ViewChild(StepperComponent) public stepper!: StepperComponent;

    errorChecker() {
      return false;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create a component with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.stepper).toBeDefined();
    expect(component.stepper.steps.length).toBe(3);
  });

  describe('Buttons', () => {
    it('should show next button and not backButton', () => {
      expect(component).toBeTruthy();
      expect(component.stepper.showNextButton).toBe(true);
      expect(component.stepper.showPrevButton).toBe(false);
    });

    it('should show back button along with nextButton on 2nd step', () => {
      // act, arrange
      component.stepper.updateIndex(1);

      expect(component).toBeTruthy();
      expect(component.stepper.showNextButton).toBe(true);
      expect(component.stepper.showPrevButton).toBe(true);
    });
  });

  describe('Next', () => {
    it('should not proceed if stepForm is invalid', () => {
      const firstStep = component.stepper.steps.get(0)!;
      firstStep.stepForm = new FormGroup({
        name: new FormControl('', [Validators.required])
      });

      component.stepper.next();

      expect(component.stepper.currentIndex).toBe(0)
    });

    it('should render errorState where errorChecker is failing', () => {
      const firstStep = component.stepper.steps.get(0)!;
      firstStep.stepForm = new FormGroup({
        name: new FormControl('', [Validators.required])
      });
      spyOn(component, 'errorChecker').and.callFake(() => true);
      const updateIndexSpyOn = spyOn(component.stepper, 'updateIndex');

      component.stepper.next();

      expect(updateIndexSpyOn).not.toHaveBeenCalled();
      expect(component.stepper.currentIndex).toBe(0);
    });

    it('should emit nextClick event', () => {
      const spyOnNextClick = spyOn(component.stepper.nextClick, 'emit');

      component.stepper.next();

      expect(spyOnNextClick).toHaveBeenCalled();
    });

    it('should emit wizardFinish event at the end.', () => {
      const spyOnWizardFinish = spyOn(component.stepper.wizardFinish, 'emit');
      component.stepper.currentIndex = 2;

      component.stepper.next();

      expect(spyOnWizardFinish).toHaveBeenCalled();
    });
  });

  it('should call updateIndex method', () => {
    component.stepper.updateIndex(1);

    expect(component.stepper.currentIndex).toBe(1);
  });

});
