import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { locations } from 'src/app/constants/locations';
import { packages } from 'src/app/constants/packages';
import { PremiumCalculationService } from 'src/app/services/premium-calculation.service';
import { StepComponent } from '../step/step.component';
import { UserDetails } from 'src/app/models/user-details.model';

@Component({
  selector: 'fw-user-details-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit {

  locations = locations;
  packages = packages;

  userDetailsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required]),
    location: new FormControl<string>('', [Validators.required]),
    package: new FormControl<string>('standard', [Validators.required]),
    total: new FormControl<number>(0),
  });

  @Input() userDetails!: UserDetails;

  constructor(
    private premiumCalculation: PremiumCalculationService,
    @Host() @Optional() private step: StepComponent,
  ) { }

  ngOnInit(): void {
    if (this.userDetails) {
      this.userDetailsForm.patchValue(this.userDetails);
    }
    // Bind a for to step control if it exists
    if (this.step) {
      this.step.stepForm = this.userDetailsForm;
    }

    // TODO: on destroy
    // TODO: be specific on control when subscribe
    this.userDetailsForm.valueChanges.subscribe(({ package: pckg, age, location }) => {
      let total = 0;
      if (pckg && location && !!age) {
        const selectedPackage = this.packages.find(p => p.id === pckg)!;
        const selectedLocation = this.locations.find(p => p.id === location)!;
        total = this.premiumCalculation.calculate(age, selectedLocation.rate, selectedPackage.percentage);
      }
      this.userDetailsForm.patchValue({ total }, { onlySelf: true, emitEvent: false });
    });
  }

}
