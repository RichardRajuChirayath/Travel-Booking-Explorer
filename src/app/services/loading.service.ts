import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    // Use delay(0) to push the value change to the next turn of the event loop,
    // avoiding the famous "ExpressionChangedAfterItHasBeenCheckedError" in Angular.
    readonly loading$ = this.loadingSubject.asObservable().pipe(delay(0));

    show(): void {
        this.loadingSubject.next(true);
    }

    hide(): void {
        this.loadingSubject.next(false);
    }
}
