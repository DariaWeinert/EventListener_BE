import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getAll(): Promise<Event[]>;
    getEventByID(id: string): Promise<Event>;
    getEventsByCreator(req: any, id: string): Promise<Event[]>;
    createEvent(req: any, createEventDto: CreateEventDto): Promise<Event>;
    updateEvent(req: any, updateEventDto: UpdateEventDto, id: string): Promise<Event>;
    deleteEvent(req: any, id: any): Promise<Event>;
    joinEvent(req: any, id: any): Promise<Event>;
    leaveEvent(req: any, id: any): Promise<Event>;
    saveEvent(req: any, id: any): Promise<Event>;
    unsaveEvent(req: any, id: any): Promise<Event>;
}
