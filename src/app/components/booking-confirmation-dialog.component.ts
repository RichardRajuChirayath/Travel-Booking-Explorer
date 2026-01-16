import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-booking-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <div class="dialog-header">
      <div class="success-icon-wrapper">
        <mat-icon class="success-icon">check_circle</mat-icon>
      </div>
      <h2 mat-dialog-title>Booking Confirmed!</h2>
    </div>

    <mat-dialog-content class="content-wrapper">
      <p class="subtitle">Your adventure awaits, get ready!</p>
      
      <div class="booking-card">
        <div class="detail-row">
          <span class="label">Package</span>
          <span class="value">{{ data.packageName }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Travelers</span>
          <span class="value">{{ data.travelers }} Person(s)</span>
        </div>
        <div class="detail-row">
          <span class="label">Date</span>
          <span class="value">{{ data.date | date:'fullDate' }}</span>
        </div>
        <mat-divider style="margin: 12px 0;"></mat-divider>
        <div class="detail-row total-row">
          <span class="label">Total Paid</span>
          <span class="value currency">{{ data.amount | currency:'INR':'symbol':'1.0-0' }}</span>
        </div>
      </div>

      <div class="email-notice">
        <mat-icon color="primary">mark_email_read</mat-icon>
        <span>A confirmation email has been sent to your inbox.</span>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="center" class="actions-wrapper">
      <button mat-stroked-button (click)="onClose()">Close</button>
      <button mat-flat-button color="primary" (click)="onViewBookings()">
        <mat-icon>dashboard</mat-icon> 
        View My Bookings
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header {
      text-align: center;
      padding-top: 24px;
    }
    .success-icon-wrapper {
      display: inline-flex;
      background-color: #e8f5e9;
      border-radius: 50%;
      padding: 16px;
      margin-bottom: 8px;
    }
    .success-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #2e7d32;
    }
    h2 {
      margin-bottom: 4px;
      font-size: 1.5rem;
      color: #333;
    }
    .subtitle {
      text-align: center;
      color: #666;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .content-wrapper {
      min-width: 350px;
    }
    .booking-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      border: 1px solid #e0e0e0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .detail-row:last-child {
      margin-bottom: 0;
    }
    .label {
      color: #666;
      font-size: 0.9rem;
    }
    .value {
      font-weight: 500;
      color: #333;
      text-align: right;
    }
    .total-row .value {
      font-size: 1.1rem;
      font-weight: bold;
      color: #3f51b5;
    }
    .email-notice {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #555;
      font-size: 0.9rem;
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      justify-content: center;
    }
    .actions-wrapper {
      padding: 24px;
      gap: 12px;
    }
    button {
      min-width: 100px;
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
