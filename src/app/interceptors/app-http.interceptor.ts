import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    const snackBar = inject(MatSnackBar);

    // Don't show loader for background tasks or specific urls if needed
    // For now, show for all
    loadingService.show();

    return next(req).pipe(
        catchError((error) => {
            let errorMessage = 'An error occurred';
            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }

            snackBar.open(errorMessage, 'Close', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });

            return throwError(() => error);
        }),
        finalize(() => {
            loadingService.hide();
        })
    );
};
