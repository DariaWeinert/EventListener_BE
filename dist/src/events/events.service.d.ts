/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from 'src/auth/interfaces/auth.interface';
export declare class EventsService {
    private eventModel;
    private readonly userModel;
    constructor(eventModel: Model<Event>, userModel: Model<Auth>);
    getAll(): Promise<Event[]>;
    getEventByID(id: string): Promise<Event>;
    getEventsByCreator(id: string): Promise<Event[]>;
    createEvent(event: CreateEventDto): Promise<Event>;
    updateEvent(id: string, event: UpdateEventDto): Promise<Event>;
    deleteEvent(id: string): Promise<Event>;
    joinEvent(eventID: string, userID: string): Promise<Event>;
    leaveEvent(eventID: string, userID: string): Promise<Event>;
    isMember(userID: string, eventID: string): Promise<Event>;
    isExpire(eventID: string): Promise<Event>;
    isCreator(userID: string, eventID: string): Promise<Event>;
    saveEvent(eventID: string, userID: string): Promise<Event>;
    unsaveEvent(eventID: string, userID: string): Promise<Event>;
    isSaved(userID: string, eventID: string): Promise<Event>;
}
