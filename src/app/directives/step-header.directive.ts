import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[stepHeader]',
  standalone: true,
})
export class StepHeaderDirective {

  constructor(
    public template: TemplateRef<unknown>,
  ) { }

}
