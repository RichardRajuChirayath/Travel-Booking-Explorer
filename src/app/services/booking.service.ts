import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3001/bookings';

    private bookingsSubject = new BehaviorSubject<Booking[]>([]);
    bookings$ = this.bookingsSubject.asObservable();

    createBooking(booking: Booking): Observable<Booking> {
        return this.http.post<Booking>(this.apiUrl, booking).pipe(
            tap(newBooking => {
                const currentBookings = this.bookingsSubject.value;
                this.bookingsSubject.next([...currentBookings, newBooking]);
            })
        );
    }

    fetchUserBookings(userId: string): Observable<Booking[]> {
        // Filter by top-level userId for better compatibility
        return this.http.get<Booking[]>(`${this.apiUrl}?userId=${userId}`).pipe(
            tap(bookings => this.bookingsSubject.next(bookings))
        );
    }

    cancelBooking(bookingId: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${bookingId}`, { status: 'Cancelled' }).pipe(
            tap(() => {
                const currentBookings = this.bookingsSubject.value.map(b =>
                    b.id === bookingId ? { ...b, status: 'Cancelled' as any } : b
                );
                this.bookingsSubject.next(currentBookings);
            })
        );
    }
}
