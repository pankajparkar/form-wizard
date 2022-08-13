import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { StepComponent } from './components/step/step.component';
import { StepperComponent } from './components/stepper/stepper.component';
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
  ]
})
export class AppComponent {
  title = 'form-wizard';
}
