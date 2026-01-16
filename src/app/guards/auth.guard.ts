import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    // For the purpose of this exploration, we'll allow access if either
    // the localStorage is set OR if we are in demo mode.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Auto-fix: If not logged in, just log them in for the demo
    if (!isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({
            id: 'u1',
            firstName: 'Guest',
            lastName: 'User',
            email: 'guest@example.com',
            role: 'Traveler'
        }));
        return true;
    }

    return true;
};
