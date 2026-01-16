import { Routes } from '@angular/router';
import { DestinationList } from './components/destination-list/destination-list';
import { PackageDetail } from './components/package-detail/package-detail';
import { BookingForm } from './components/booking-form/booking-form';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { Overview } from './components/package-detail/overview/overview';
import { Itinerary } from './components/package-detail/itinerary/itinerary';
import { Reviews } from './components/package-detail/reviews/reviews';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/destinations', pathMatch: 'full' },
    { path: 'destinations', component: DestinationList },
    {
        path: 'package/:id',
        component: PackageDetail,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: Overview },
            { path: 'itinerary', component: Itinerary },
            { path: 'reviews', component: Reviews }
        ]
    },
    { path: 'booking', component: BookingForm },
    { path: 'book/:id', component: BookingForm },
    {
        path: 'dashboard',
        component: UserDashboard,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '/destinations' }
];
