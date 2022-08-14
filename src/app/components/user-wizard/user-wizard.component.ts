import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperComponent } from '../stepper/stepper.component';
import { StepComponent } from '../step/step.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { UserDetailsFormComponent } from '../user-details-form/user-details-form.component';
import { SummaryComponent } from '../summary/summary.component';
import { ErrorComponent } from '../error/error.component';
import { FormWizardService } from '@services/form-wizard.service';
import { UserDetailsWizard } from '@models/user-details-wizard.model';
import { UserDetails } from '@models/user-details.model';
import { StepHeaderDirective } from '@components/step-header/step-header.directive';

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
