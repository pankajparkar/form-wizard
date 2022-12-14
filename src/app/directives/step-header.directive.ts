import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[fwStepHeader]',
  standalone: true,
})
export class StepHeaderDirective {

  constructor(
    public template: TemplateRef<unknown>,
  ) { }

}
