import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fw-user-details-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
