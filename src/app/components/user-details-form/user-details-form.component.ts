import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  userDetailsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    age: new FormControl<string>('', [Validators.required]),
    location: new FormControl<string>('', [Validators.required]),
    package: new FormControl<string>('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
