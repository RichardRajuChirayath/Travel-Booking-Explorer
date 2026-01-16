import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DestinationService } from '../../../services/destination.service';
import { Package } from '../../../models/package.model';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './itinerary.html',
  styleUrl: './itinerary.css',
})
export class Itinerary implements OnInit {
  private route = inject(ActivatedRoute);
  private destinationService = inject(DestinationService);

  pkg = signal<Package | null>(null);

  // Mock detailed itinerary for demonstration
  itineraryData = [
    { title: 'Arrival & Check-in', desc: 'Welcome at the airport and transfer to your luxury accommodation. Enjoy a welcome dinner at a local rooftop restaurant.', icon: 'flight_land' },
    { title: 'City Exploration', desc: 'Comprehensive guided tour of the major landmarks and hidden gems. Visit local markets and enjoy authentic street food.', icon: 'map' },
    { title: 'Nature & Adventure', desc: 'A day dedicated to outdoor activities. Choose between a mountain hike, a river cruise, or a botanical garden visit.', icon: 'landscape' },
    { title: 'Leisure & Culture', desc: 'Attend a cultural performance or workshop. The afternoon is free for shopping or personal exploration.', icon: 'theater_comedy' },
    { title: 'Farewell & Departure', desc: 'Final morning at leisure. Transfer to the airport for your return journey with unforgettable memories.', icon: 'flight_takeoff' }
  ];

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.destinationService.getPackageById(id).subscribe(data => {
        this.pkg.set(data);
      });
    }
  }
}
