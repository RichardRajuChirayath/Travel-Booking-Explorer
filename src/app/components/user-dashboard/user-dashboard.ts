import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Booking, BookingStatus } from '../../models/booking.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatExpansionModule,
    MatTooltipModule,
    RouterLink
  ],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  private bookingService = inject(BookingService);

  // Use the service's stream for real-time updates
  bookings$: Observable<Booking[]> = this.bookingService.bookings$;
  displayedColumns: string[] = ['package', 'date', 'travelers', 'amount', 'status', 'actions'];

  userId = 'u1';

  ngOnInit(): void {
    // Refresh the data when the component loads
    this.bookingService.fetchUserBookings(this.userId).subscribe();
  }

  cancelBooking(bookingId: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(bookingId).subscribe();
    }
  }

  getStatusColor(status: BookingStatus): string {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'primary';
      case BookingStatus.PENDING: return 'accent';
      case BookingStatus.CANCELLED: return 'warn';
      case BookingStatus.COMPLETED: return 'primary';
      default: return '';
    }
  }

  getPendingCount(bookings: Booking[] | null): number {
    return (bookings || []).filter(b => b.status === BookingStatus.PENDING).length;
  }

  getConfirmedCount(bookings: Booking[] | null): number {
    return (bookings || []).filter(b => b.status === BookingStatus.CONFIRMED).length;
  }
}
