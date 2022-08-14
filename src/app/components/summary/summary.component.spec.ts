import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render user details when object is passed', () => {
    component.userDetails = {
      age: 10,
      location: 'HKD',
      name: 'Pankaj',
      package: 'standard',
      total: 100,
    }

    expect(fixture.debugElement.nativeElement.querySelector('.summary .user-details')).toBeDefined();
  });

  it('should not render user details when object is empty', () => {
    expect(component).toBeTruthy();
  });
});
