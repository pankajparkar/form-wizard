import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fw-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {

  @Input() header!: string;
  @ViewChild('stepContent', { read: TemplateRef }) content!: TemplateRef<unknown>;

}
