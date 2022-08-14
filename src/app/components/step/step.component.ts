import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fw-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {

  @Input() header!: string;
  @Input() stepForm: FormControl | FormGroup | FormArray | undefined;

  @ViewChild('stepContent', { read: TemplateRef }) content!: TemplateRef<unknown>;

}
