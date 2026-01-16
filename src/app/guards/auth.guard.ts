import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    // Basic mock authentication check
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        return true;
    } else {
        // Redirect to destinations if not logged in
        return router.parseUrl('/destinations?loginRequired=true');
    }
};
