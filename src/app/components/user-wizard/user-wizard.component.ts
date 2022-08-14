import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperComponent } from '@components/stepper/stepper.component';
import { StepComponent } from '@components/step/step.component';
import { WelcomeComponent } from '@components/welcome/welcome.component';
import { UserDetailsFormComponent } from '@components/user-details-form/user-details-form.component';
import { SummaryComponent } from '@components/summary/summary.component';
import { ErrorComponent } from '@components/error/error.component';
import { StepHeaderDirective } from '@directives/step-header.directive';
import { UserDetailsWizard } from '@models/user-details-wizard.model';
import { UserDetails } from '@models/user-details.model';
import { FormWizardService } from '@services/form-wizard.service';
import { StepErrorDirective } from '@directives/step-error.directive';
import { ErrorStepHeaderDirective } from '@directives/error-step-header.directive';

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
    StepHeaderDirective,
    ErrorStepHeaderDirective,
    StepErrorDirective,
  ],
  templateUrl: './user-wizard.component.html',
  styleUrls: ['./user-wizard.component.scss'],
})
export class UserWizardComponent {

  constructor(
    private formWizard: FormWizardService<UserDetailsWizard>,
  ) { }

  nextClick(event: any) {
    if (!!event) {
      this.formWizard.setDetails(event);
    }
  }

  errorChecker(formData: UserDetails) {
    return formData.age > 100;
  }

  get userDetails() {
    return this.formWizard.getDetails().userDetails;
  }

  winzardFinish() {
    this.formWizard.submit();
  }

}
