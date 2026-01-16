import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination.model';
import { Package } from '../models/package.model';

@Injectable({
    providedIn: 'root'
})
export class DestinationService {
    private http = inject(HttpClient);
    private destUrl = 'http://localhost:3001/destinations';
    private packageUrl = 'http://localhost:3001/packages';

    getDestinations(): Observable<Destination[]> {
        return this.http.get<Destination[]>(this.destUrl);
    }

    getDestinationById(id: string): Observable<Destination> {
        return this.http.get<Destination>(`${this.destUrl}/${id}`);
    }

    getPackageById(id: string): Observable<Package> {
        return this.http.get<Package>(`${this.packageUrl}/${id}`);
    }
}
