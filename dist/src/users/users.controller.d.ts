/// <reference types="multer" />
import { UsersService } from './users.service';
import { Auth } from 'src/auth/interfaces/auth.interface';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class UsersController {
    private readonly usersService;
    private readonly cloudinaryService;
    constructor(usersService: UsersService, cloudinaryService: CloudinaryService);
    getUserInfo(req: any): Promise<Auth>;
    updateUserInfo(UpdateUserDto: UpdateUserDto, req: any, file: Express.Multer.File): Promise<Auth>;
    getSavedEvents(req: any): Promise<Event[]>;
    getJoinedEvents(req: any): Promise<Event[]>;
    getUserById(params: any): Promise<Auth>;
}
