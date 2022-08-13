import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// TODO: move to different files
interface Location {
  id: number;
  name: string;
  code: string;
}

// TODO: move to different files
interface Package {
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

  locations: Location[] = [
    {
      id: 1,
      name: 'Hong Kong',
      code: 'HKD',
    },
    {
      id: 2,
      name: 'USA',
      code: 'USD',
    },
    {
      id: 1,
      name: 'Australia',
      code: 'AUD',
    },
  ];

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
    package: new FormControl<string>('', [Validators.required]),
  });

  constructor() { }

}
