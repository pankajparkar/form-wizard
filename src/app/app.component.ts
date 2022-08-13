import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StepperComponent } from './components/stepper/stepper.component';

@Component({
  standalone: true,
  selector: 'fw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    StepperComponent,
  ]
})
export class AppComponent {
  title = 'form-wizard';
}
