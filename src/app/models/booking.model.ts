import { Package } from './package.model';
import { User } from './user.model';

export enum BookingStatus {
    PENDING = 'Pending',
    CONFIRMED = 'Confirmed',
    CANCELLED = 'Cancelled',
    COMPLETED = 'Completed'
}

export interface Booking {
    id: string;
    user: User;
    travelPackage: Package;
    bookingDate: Date;
    status: BookingStatus;
    totalAmount: number;
    numberOfTravelers: number;
    specialRequests?: string;
}

export class TravelBooking implements Booking {
    constructor(
        public id: string,
        public user: User,
        public travelPackage: Package,
        public bookingDate: Date,
        public status: BookingStatus,
        public totalAmount: number,
        public numberOfTravelers: number,
        public specialRequests?: string
    ) { }

    get isCancellable(): boolean {
        // Only pending or confirmed bookings can be cancelled
        return this.status === BookingStatus.PENDING || this.status === BookingStatus.CONFIRMED;
    }
}
