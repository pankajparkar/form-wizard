import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[fwErrorStepHeader]',
  standalone: true,
})
export class ErrorStepHeaderDirective {

  constructor(
    public template: TemplateRef<unknown>,
  ) { }

}
