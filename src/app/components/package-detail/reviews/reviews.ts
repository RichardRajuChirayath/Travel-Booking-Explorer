import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews {
  reviews = [
    {
      name: 'Sarah Johnson',
      date: 'Dec 2025',
      rating: 5,
      comment: 'An absolutely magical experience! The attention to detail was incredible. Everything from the hotel to the private tours was perfect.',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
      name: 'Michael Chen',
      date: 'Nov 2025',
      rating: 4,
      comment: 'Very well organized. The itinerary was balanced with activities and free time. The local guide was extremely knowledgeable.',
      avatar: 'https://i.pravatar.cc/150?u=michael'
    },
    {
      name: 'Elena Rodriguez',
      date: 'Oct 2025',
      rating: 5,
      comment: 'This was a dream come true. The views were breathtaking and the hospitality was world-class. Highly recommend this package!',
      avatar: 'https://i.pravatar.cc/150?u=elena'
    }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
