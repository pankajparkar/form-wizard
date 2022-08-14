import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetails } from '@models/user-details.model';
import { packages } from '@constants/packages';
import { locations } from '@constants/locations';

@Component({
  selector: 'fw-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  @Input() userDetails!: UserDetails;

  get selectedPackage() {
    return packages.find(p => p.id === this.userDetails.package)!;
  }

  get selectedLocation() {
    return locations.find(p => p.id === this.userDetails.location)!;
  }
}
