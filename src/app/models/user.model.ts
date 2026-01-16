export enum UserRole {
    ADMIN = 'Admin',
    TRAVELER = 'Traveler',
    GUEST = 'Guest'
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    phoneNumber?: string;
    profileImageUrl?: string;
}

export class AppUser implements User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: UserRole = UserRole.TRAVELER,
        public phoneNumber?: string,
        public profileImageUrl?: string
    ) { }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
