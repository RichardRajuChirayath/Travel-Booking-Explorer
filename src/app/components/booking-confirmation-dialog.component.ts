import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Booking } from '../models/booking.model';

@Component({
    selector: 'app-booking-confirmation-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
    template: `
    <h2 mat-dialog-title>
      <mat-icon>check_circle</mat-icon>
      Booking Confirmed!
    </h2>
    <mat-dialog-content>
      <div class="confirmation-details">
        <p><strong>Package:</strong> {{ data.packageName }}</p>
        <p><strong>Travelers:</strong> {{ data.travelers }}</p>
        <p><strong>Date:</strong> {{ data.date | date:'fullDate' }}</p>
        <p><strong>Total Amount:</strong> {{ data.amount | currency }}</p>
        <div class="success-message">
          <mat-icon color="primary">email</mat-icon>
          <span>A confirmation email has been sent to your inbox.</span>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Close</button>
      <button mat-raised-button color="primary" (click)="onViewBookings()">View My Bookings</button>
    </mat-dialog-actions>
  `,
    styles: [`
    h2 {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #2e7d32;
    }
    .confirmation-details {
      padding: 16px 0;
    }
    .confirmation-details p {
      margin: 8px 0;
      font-size: 1rem;
    }
    .success-message {
      margin-top: 16px;
      padding: 12px;
      background: #e8f5e9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class BookingConfirmationDialogComponent {
    data = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<BookingConfirmationDialogComponent>);

    onClose() {
        this.dialogRef.close();
    }

    onViewBookings() {
        this.dialogRef.close('viewBookings');
    }
}
