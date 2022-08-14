import { ContentChild, Directive, TemplateRef, ViewChild } from '@angular/core';
import { StepHeaderDirective } from './step-header.directive';

@Directive({
  selector: 'ng-template[fwStepError]',
  standalone: true,
})
export class StepErrorDirective {

  @ContentChild(StepHeaderDirective) stepHeader!: StepHeaderDirective;

  constructor(
    public template: TemplateRef<unknown>,
  ) { }

}
