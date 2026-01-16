import { Pipe, PipeTransform } from '@angular/core';
import { Destination } from '../models/destination.model';

@Pipe({
    name: 'filterDestinations',
    standalone: true
})
export class FilterDestinationsPipe implements PipeTransform {

    transform(destinations: Destination[] | null, searchText: string, minRating: number = 0): Destination[] {
        if (!destinations) return [];

        // Normalize search text
        const search = searchText ? searchText.toLowerCase() : '';

        return destinations.filter(dest => {
            // Filter by Country or Name (Text Match)
            const matchesSearch = !search ||
                dest.country.toLowerCase().includes(search) ||
                dest.name.toLowerCase().includes(search);

            // Filter by Popularity (Rating)
            const matchesRating = dest.rating >= minRating;

            // Note: "Cost" is not on Destination model, but this pipe structure 
            // allows easy extension if we added an averagePrice field later.

            return matchesSearch && matchesRating;
        });
    }
}
