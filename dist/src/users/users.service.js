"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const saltOrRounds = 10;
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserInfo(id) {
        return await this.userModel.findById(id);
    }
    async updateUserInfo(id, user, imageURL) {
        const existingUser = await this.userModel.findById(id);
        if (!existingUser) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.email != existingUser.email) {
            const anotherUser = await this.userModel.findOne({ email: user.email });
            if (anotherUser) {
                throw new common_1.BadRequestException('Email already exists');
            }
        }
        if (user.city) {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${user.city}&format=json`);
            const existingCity = await response.json();
            if (!existingCity[0]) {
                throw new common_1.BadRequestException('Invalid city name');
            }
            existingUser.city = user.city;
        }
        user.firstName ? existingUser.firstName = user.firstName : undefined;
        user.lastName ? existingUser.lastName = user.lastName : undefined;
        if (user.password) {
            const hash = await bcrypt.hash(user.password, saltOrRounds);
            existingUser.password = hash;
        }
        imageURL ? existingUser.imageURL = imageURL : undefined;
        user.email ? existingUser.email = user.email : undefined;
        user.bio ? existingUser.bio = user.bio : undefined;
        user.phone ? existingUser.phone = user.phone : undefined;
        user.interests ? existingUser.interests = user.interests : undefined;
        return await existingUser.save();
    }
    async getSavedEvents(id) {
        return await this.userModel.findById(id).select('savedEvents').populate('savedEvents');
    }
    async getJoinedEvents(id) {
        return await this.userModel.findById(id).select('joinedEvents').populate('joinedEvents');
    }
    async getUserById(id) {
        return await this.userModel.findById(id).select('firstName lastName city interests imageURL createdAt');
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map