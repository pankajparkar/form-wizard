import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { StepHeaderDirective } from '@directives/step-header.directive';

@Component({
  selector: 'fw-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {

  @Input()
  header!: string;
  @Input()
  buttonLabels: { next?: string; back?: string; } | undefined;
  @Input()
  stepForm: FormControl | FormGroup | FormArray | undefined;
  @Input()
  errorChecker: Function | undefined;

  @ViewChild('stepContent', { read: TemplateRef })
  content!: TemplateRef<unknown>;
  @ContentChild(StepHeaderDirective)
  stepHeader!: StepHeaderDirective;

}
