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
import { Auth } from 'src/auth/interfaces/auth.interface';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<Auth>);
    getUserInfo(id: string): Promise<Auth>;
    updateUserInfo(id: string, user: UpdateUserDto, imageURL: string): Promise<Auth>;
    getSavedEvents(id: string): Promise<Event[]>;
    getJoinedEvents(id: string): Promise<Event[]>;
    getUserById(id: string): Promise<Auth>;
}
