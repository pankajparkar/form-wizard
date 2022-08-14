import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { UserDetails } from '@models/user-details.model';
import { FormWizardService } from '@services/form-wizard.service';

import { UserWizardComponent } from './user-wizard.component';

describe('UserWizardComponent', () => {
  let component: UserWizardComponent;
  let fixture: ComponentFixture<UserWizardComponent>;
  const fakeService = {
    submit: () => { },
    getDetails: () => ({}),
    setDetails: () => { },
  }

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        UserWizardComponent
      ],
      providers: [
        { provide: FormWizardService, useValue: fakeService }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {

  });

  it('should render with a stepper component', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('fw-stepper')).toBeDefined();
  });

  describe('ErroChecker', () => {
    it('should return true if age is greater', () => {
      expect(component.errorChecker({
        age: 10, location: '1', name: '1', package: '1', total: 100
      })).toBeFalsy();
    });

    it('should return false if age is lesser', () => {
      expect(component.errorChecker({
        age: 101, location: '1', name: '1', package: '1', total: 100
      })
      ).toBeTruthy();
    });
  });
  it('should call formWizard and stepper methods on wizardFinish', () => {
    // arrange
    const spyOnFormWizardSubmit = spyOn(fakeService, 'submit');
    const spyOnUpdateIndex = spyOn(component.stepper, 'updateIndex');
    const spyOnClear = spyOn(component.stepper, 'clear');

    // act
    component.wizardFinish();

    // assert
    expect(spyOnFormWizardSubmit).toHaveBeenCalled();
    expect(spyOnUpdateIndex).toHaveBeenCalled();
    expect(spyOnClear).toHaveBeenCalled();
  });


  describe('nextClick', () => {
    it('should call formWizard setDetails when contains formData', () => {
      // arrange
      const spyOnFormWizardSetDetails = spyOn(fakeService, 'setDetails');

      // act
      component.nextClick({});

      // assert
      expect(spyOnFormWizardSetDetails).toHaveBeenCalled();
    });

    it('should not call formWizard setDetails when contains formData', () => {
      // arrange
      const spyOnFormWizardSetDetails = spyOn(fakeService, 'setDetails');

      // act
      component.nextClick(null);

      // assert
      expect(spyOnFormWizardSetDetails).not.toHaveBeenCalled();
    });
  });
});
