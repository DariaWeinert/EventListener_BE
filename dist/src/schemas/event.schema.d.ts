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
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Address } from 'src/events/dto/create-event.dto';
export type EventDocument = HydratedDocument<Event>;
export declare class Event {
    creator: string;
    date: Date;
    duration: number;
    address: Address;
    topic: string;
    place: string;
    category: string[];
    joinedBy: string[];
    savedBy: string[];
    imageURL: string;
    membersAmount: number;
    budget: number;
}
export declare const EventSchema: mongoose.Schema<Event, mongoose.Model<Event, any, any, any, mongoose.Document<unknown, any, Event> & Event & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Event, mongoose.Document<unknown, {}, mongoose.FlatRecord<Event>> & mongoose.FlatRecord<Event> & {
    _id: mongoose.Types.ObjectId;
}>;
