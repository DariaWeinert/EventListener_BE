import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import dotenv from 'dotenv';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


dotenv.config();
@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), UsersModule, PassportModule,
    JwtModule.register({
        secret: process.env.jwt_secret,
        signOptions: { expiresIn: '864000s' },
    }),],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, CloudinaryService],
})
export class AuthModule {

}
