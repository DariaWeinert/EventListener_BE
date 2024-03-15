export declare class Address {
    type: string;
    coordinates: number[];
}
export declare class CreateEventDto {
    creator: string;
    date: Date;
    address: Address;
    topic: string;
    place: string;
    category: string[];
    membersAmount: number;
    budget: number;
}
