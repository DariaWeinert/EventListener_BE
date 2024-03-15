/// <reference types="multer" />
import { AuthService } from './auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Token } from './interfaces/token.interface';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly cloudinaryService;
    constructor(authService: AuthService, cloudinaryService: CloudinaryService);
    loginUser(LoginUserDto: LoginUserDto): Promise<Token>;
    createUser(SignupUserDto: SignupUserDto, file: Express.Multer.File): Promise<Token>;
}
