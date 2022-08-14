import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetails } from 'src/app/models/user-details.model';

@Component({
  selector: 'fw-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  @Input() userDetails!: UserDetails;

}
