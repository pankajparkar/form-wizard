import { ComponentFixture, flush, TestBed } from '@angular/core/testing';
import { PremiumCalculationService } from '@services/premium-calculation.service';

import { UserDetailsFormComponent } from './user-details-form.component';

describe('UserDetailsFormComponent', () => {
  let component: UserDetailsFormComponent;
  let fixture: ComponentFixture<UserDetailsFormComponent>;

  const premiumCalculationService = {
    calculate: () => { },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsFormComponent],
      providers: [
        { provide: PremiumCalculationService, useValue: premiumCalculationService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component with default values', () => {
    expect(component).toBeTruthy();
    expect(component.userDetailsForm).toBeDefined();
    expect(component.userDetailsForm.value.package).toBe('standard');
  });

  it('should update total value if any value changes', () => {
    // arrange
    const calculateSpy = spyOn(premiumCalculationService, 'calculate');

    // act
    component.userDetailsForm.patchValue({
      age: 10,
      package: 'standard',
      location: 'HKD',
    });

    // assert 
    expect(calculateSpy).toHaveBeenCalled();
  });

});
