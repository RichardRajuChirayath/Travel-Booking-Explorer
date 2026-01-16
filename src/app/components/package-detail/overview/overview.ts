import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DestinationService } from '../../../services/destination.service';
import { Package } from '../../../models/package.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatDividerModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  private route = inject(ActivatedRoute);
  private destinationService = inject(DestinationService);

  pkg = signal<Package | null>(null);

  ngOnInit(): void {
    // Get the ID from the parent route's params
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.destinationService.getPackageById(id).subscribe(data => {
        this.pkg.set(data);
      });
    }
  }

  getIconForService(service: string): string {
    const s = service.toLowerCase();
    if (s.includes('flight')) return 'flight';
    if (s.includes('hotel') || s.includes('accommodation') || s.includes('stay') || s.includes('villa') || s.includes('suite') || s.includes('resort')) return 'hotel';
    if (s.includes('breakfast') || s.includes('dinner') || s.includes('meal') || s.includes('food')) return 'restaurant';
    if (s.includes('tour') || s.includes('guide') || s.includes('visit')) return 'explore';
    if (s.includes('ticket') || s.includes('pass') || s.includes('entry')) return 'confirmation_number';
    if (s.includes('train') || s.includes('rail')) return 'train';
    if (s.includes('cruise') || s.includes('boat') || s.includes('yacht')) return 'directions_boat';
    return 'check_circle';
  }
}
