# Form Wizard

## Diagram

![This is an image](https://raw.githubusercontent.com/pankajparkar/form-wizard/master/stepper.drawio.png)

## Philosophy -

- All components are embedded inside one another
- Stepper Component  have multiple Steps
- These steps are programattically added to the DOM, based on current wizard step.
- Each step carry its own header (ng-template fwStepHeader).

## Sample Code - 

```lang=html
<fw-stepper (nextClick)="nextClick($event)" stepper="#fwStepper">
    <fw-step [buttonLabels]="{next: 'Start'}">
        <ng-template fwStepHeader>Hello There!</ng-template>
        Test 1
    </fw-step>
    <fw-step [errorChecker]="errorChecker">
        <ng-template fwStepHeader>Tell us about yourself</ng-template>
        Test 2
    </fw-step>
    <fw-step [buttonLabels]="{next: 'Buy'}">
        <ng-template fwStepHeader>Summary</ng-template>
        <fw-summary></fw-summary>
    </fw-step>
    <ng-template fwErrorStepHeader>Ooops</ng-template>
    <ng-template fwStepError>
        <fw-error></fw-error>
    </ng-template>
</fw-stepper>
```

## Architectural Details

Above sample code is just a demonstration of how it will look like when it comes to usage.

- Each step component can configure the button labels for each step.
- Also each step can have `errorChecker` function configuration, it evaluates that expressions before doing nextStep.
- If `errorChecker` returns `false`, then it redirect user to Error screen. it is read by using `fwStepError` directive.
- Step component can also deal with form, it won't allow to proceed unless complete form is valid.
- We have used ContentChildren, ContentChild, ViewChildren, and @ViewChild to achieve this.