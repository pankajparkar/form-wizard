import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    expect(fixture.debugElement.nativeElement.querySelectorAll('fw-step').length).toBe(3);
  });
});
