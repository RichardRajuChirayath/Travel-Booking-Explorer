import { Destination } from './destination.model';

export enum PackageTier {
    BUDGET = 'Budget',
    STANDARD = 'Standard',
    LUXURY = 'Luxury'
}

export interface Package {
    id: string;
    destinationId: string;
    name: string;
    destination?: Destination;
    price: number;
    durationDays: number;
    startDate: Date;
    endDate: Date;
    tier: PackageTier;
    maxCapacity: number;
    availableSlots: number;
    includedServices: string[];
}

export class TravelPackage implements Package {
    id: string;
    destinationId: string;
    name: string;
    destination?: Destination;
    price: number;
    durationDays: number;
    startDate: Date;
    endDate: Date;
    tier: PackageTier;
    maxCapacity: number;
    availableSlots: number;
    includedServices: string[];

    constructor(data: Package) {
        this.id = data.id;
        this.destinationId = data.destinationId;
        this.name = data.name;
        this.destination = data.destination;
        this.price = data.price;
        this.durationDays = data.durationDays;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.tier = data.tier;
        this.maxCapacity = data.maxCapacity;
        this.availableSlots = data.availableSlots;
        this.includedServices = data.includedServices;
    }

    get isFull(): boolean {
        return this.availableSlots <= 0;
    }

    get discountPrice(): number {
        // Example logic: Standard packages get 5% off, Luxury get 10%
        if (this.tier === PackageTier.LUXURY) return this.price * 0.9;
        if (this.tier === PackageTier.STANDARD) return this.price * 0.95;
        return this.price;
    }
}
