import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperComponent } from '../stepper/stepper.component';
import { StepComponent } from '../step/step.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { UserDetailsFormComponent } from '../user-details-form/user-details-form.component';
import { SummaryComponent } from '../summary/summary.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'fw-user-wizard',
  standalone: true,
  imports: [
    CommonModule,
    StepperComponent,
    StepComponent,
    WelcomeComponent,
    UserDetailsFormComponent,
    SummaryComponent,
    ErrorComponent,
  ],
  templateUrl: './user-wizard.component.html',
  styleUrls: ['./user-wizard.component.scss'],
})
export class UserWizardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
