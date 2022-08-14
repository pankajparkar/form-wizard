import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[fwStepError]',
  standalone: true,
})
export class StepErrorDirective {

  constructor(
    public template: TemplateRef<unknown>,
  ) { }

}
