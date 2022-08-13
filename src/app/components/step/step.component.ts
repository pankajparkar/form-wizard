import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fw-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() header!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
