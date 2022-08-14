import { Directive, TemplateRef, ViewChild } from '@angular/core';
import { StepHeaderDirective } from './step-header.directive';

@Directive({
  standalone: true,
  selector: 'ng-template[fwStepError]',
})
export class StepErrorDirective {

  @ViewChild(StepHeaderDirective) stepHeader!: StepHeaderDirective;

  constructor(
    public template: TemplateRef<unknown>,
  ) { }

}
