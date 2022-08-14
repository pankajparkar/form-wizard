import { Component, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { locations } from '@constants/locations';
import { packages } from '@constants/packages';
import { PremiumCalculationService } from 'src/app/services/premium-calculation.service';
import { StepComponent } from '../step/step.component';
import { UserDetails } from '@models/user-details.model';
import { Subject, takeUntil } from 'rxjs';

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
export class UserDetailsFormComponent implements OnInit, OnDestroy {

  locations = locations;
  packages = packages;
  destroyed$ = new Subject<void>();

  userDetailsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required]),
    location: new FormControl<string>('', [Validators.required]),
    package: new FormControl<string>('standard', {
      nonNullable: true,
      validators: [Validators.required],
    }),
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

    this.userDetailsForm.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(({ package: pckg, age, location }) => {
      let total = 0;
      if (pckg && location && !!age) {
        const selectedPackage = this.packages.find(p => p.id === pckg)!;
        const selectedLocation = this.locations.find(p => p.id === location)!;
        total = this.premiumCalculation.calculate(age, selectedLocation.rate, selectedPackage.percentage);
      }
      this.userDetailsForm.patchValue({ total }, { onlySelf: true, emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete();
  }

}
