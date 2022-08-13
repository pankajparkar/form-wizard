import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorComponent } from './components/error/error.component';

import { StepComponent } from './components/step/step.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SummaryComponent } from './components/summary/summary.component';
import { UserDetailsFormComponent } from './components/user-details-form/user-details-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@Component({
  standalone: true,
  selector: 'fw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    StepperComponent,
    StepComponent,
    WelcomeComponent,
    UserDetailsFormComponent,
    SummaryComponent,
    ErrorComponent,
  ]
})
export class AppComponent {
  title = 'form-wizard';
}
