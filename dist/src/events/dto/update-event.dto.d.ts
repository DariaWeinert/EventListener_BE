import { Address } from './create-event.dto';
export declare class UpdateEventDto {
    date: Date;
    address: Address;
    topic: string;
    place: string;
    category: string[];
    membersAmount: number;
    budget: number;
}
