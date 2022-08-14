import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetails } from '@models/user-details.model';

import { UserWizardComponent } from './user-wizard.component';

fdescribe('UserWizardComponent', () => {
  let component: UserWizardComponent;
  let fixture: ComponentFixture<UserWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWizardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render with a stepper component', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('fw-stepper')).toBeDefined();
  });

  describe('ErroChecker', () => {
    it('should return true if age is greater', () => {
      expect(component.errorChecker({ age: 10, location: '1', name: '1', package: '1', total: 100 })).toBeFalsy();
    });

    it('should return false if age is lesser', () => {
      expect(component.errorChecker({
        age: 101, location: '1', name: '1', package: '1', total: 100
      })
      ).toBeTruthy();
    });
  });

});
