import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.mongoURI), EventsModule, UsersModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
