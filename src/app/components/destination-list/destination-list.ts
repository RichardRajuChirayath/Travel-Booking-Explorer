import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import { Observable } from 'rxjs';
import { FilterDestinationsPipe } from '../../pipes/filter-destinations.pipe';
import { HighlightTopRatedDirective } from '../../directives/highlight-top-rated.directive';
import { HighlightPromoDirective } from '../../directives/highlight-promo.directive';

@Component({
  selector: 'app-destination-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    RouterLink,
    FilterDestinationsPipe,
    HighlightTopRatedDirective,
    HighlightPromoDirective
  ],
  templateUrl: './destination-list.html',
  styleUrl: './destination-list.css',
})
export class DestinationList implements OnInit {
  private destinationService = inject(DestinationService);
  destinations$: Observable<Destination[]> | undefined;

  // Filter properties
  searchText = '';
  minRating = 0;

  // For [ngStyle] demonstration
  selectedColor = '#3f51b5';

  ngOnInit(): void {
    this.destinations$ = this.destinationService.getDestinations();
  }

  getRatingColor(rating: number): string {
    return rating >= 4.8 ? 'gold-star' : 'silver-star';
  }
}
