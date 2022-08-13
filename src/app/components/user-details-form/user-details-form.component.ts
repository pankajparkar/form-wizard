import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// TODO: move to different files
export interface Location {
  id: string;
  name: string;
}

// TODO: move to different files
export interface Package {
  id: string;
  name: string;
  description: string;
  percentage: number;
}

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
export class UserDetailsFormComponent {

  // TODO: move constants to somewhere else
  locations: Location[] = [
    {
      id: 'HKD',
      name: 'Hong Kong',
    },
    {
      id: 'USD',
      name: 'USA',
    },
    {
      id: 'AUD',
      name: 'Australia',
    },
  ];

  // TODO: move constants to somewhere else
  packages: Package[] = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Standard',
      percentage: 1,
    },
    {
      id: 'safe',
      name: 'Safe',
      description: 'Safe (+250HKD, 50%)',
      percentage: 50,
    },
    {
      id: 'super_safe',
      name: 'Super Safe',
      description: 'Super Safe (+375',
      percentage: 50,
    },
  ]

  userDetailsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    age: new FormControl<string>('', [Validators.required]),
    location: new FormControl<string>('', [Validators.required]),
    package: new FormControl<string>('standard', [Validators.required]),
  });

  constructor() { }

}
