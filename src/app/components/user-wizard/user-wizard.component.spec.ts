import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWizardComponent } from './user-wizard.component';

describe('UserWizardComponent', () => {
  let component: UserWizardComponent;
  let fixture: ComponentFixture<UserWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
