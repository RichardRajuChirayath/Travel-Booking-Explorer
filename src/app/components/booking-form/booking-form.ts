import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';
import { BookingStatus } from '../../models/booking.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingConfirmationDialogComponent } from '../booking-confirmation-dialog.component';
import { DestinationService } from '../../services/destination.service';
import { Package } from '../../models/package.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
})
export class BookingForm implements OnInit {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destinationService = inject(DestinationService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  bookingForm: FormGroup;
  selectedPackage: Package | null = null;

  constructor() {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      travelers: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      bookingDate: ['', [Validators.required, this.futureDateValidator]],
      specialRequests: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destinationService.getPackageById(id).subscribe(pkg => {
        this.selectedPackage = pkg;
      });
    }
  }

  // Custom Validator: Date must be in the future
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    return selectedDate >= today ? null : { pastDate: true };
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      const pkg = this.selectedPackage || { id: 'p101', name: 'Standard Package (Default)', price: 1000 } as Package;

      const newBooking: any = {
        id: crypto.randomUUID(),
        user: { id: 'u1', firstName: 'Guest', lastName: 'User', email: formValue.email, role: 'Traveler' } as any,
        travelPackage: { id: pkg.id, name: pkg.name, price: pkg.price } as any,
        bookingDate: formValue.bookingDate,
        status: BookingStatus.PENDING,
        totalAmount: pkg.price * formValue.travelers,
        numberOfTravelers: formValue.travelers,
        specialRequests: formValue.specialRequests
      };

      this.bookingService.createBooking(newBooking).subscribe({
        next: () => {
          const dialogRef = this.dialog.open(BookingConfirmationDialogComponent, {
            width: '500px',
            data: {
              packageName: pkg.name,
              travelers: formValue.travelers,
              date: formValue.bookingDate,
              amount: newBooking.totalAmount
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result === 'viewBookings') {
              this.router.navigate(['/dashboard']);
            }
          });
        },
        error: () => {
          this.snackBar.open('Booking failed. Please try again.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
