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
import { UserService } from '../../services/user.service';
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
  // private userService = inject(UserService); // Can be used for real user data

  bookings$: Observable<Booking[]> | undefined;
  displayedColumns: string[] = ['package', 'date', 'travelers', 'amount', 'status', 'actions'];

  // Mock user ID for demonstration since we are using json-server
  userId = 'u1';

  ngOnInit(): void {
    // In a real app, we would get the ID from UserService.currentUser$
    this.bookings$ = this.bookingService.fetchUserBookings(this.userId);
  }

  cancelBooking(bookingId: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        // Refresh the list
        this.bookings$ = this.bookingService.fetchUserBookings(this.userId);
      });
    }
  }

  getStatusColor(status: BookingStatus): string {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'primary';
      case BookingStatus.PENDING: return 'accent';
      case BookingStatus.CANCELLED: return 'warn';
      case BookingStatus.COMPLETED: return 'primary'; // or a custom class
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
