import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User, UserRole, AppUser } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3001/users';

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Initial mock login check
        let savedUser = localStorage.getItem('user');

        // AUTO-LOGIN FOR DEMO if not logged in
        if (!savedUser) {
            const demoUser = new AppUser('u1', 'Guest', 'User', 'guest@example.com', UserRole.TRAVELER);
            this.login('guest@example.com', 'demo').subscribe();
            savedUser = JSON.stringify(demoUser);
        }

        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    login(email: string, password: string): Observable<User> {
        // Simulate API call
        const mockUser = new AppUser('u1', 'John', 'Doe', email, UserRole.TRAVELER);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(mockUser));
        this.currentUserSubject.next(mockUser);
        return of(mockUser);
    }

    logout(): void {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}
