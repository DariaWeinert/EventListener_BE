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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const saltOrRounds = 10;
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async loginUser(user) {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (!existingUser) {
            throw new common_1.BadRequestException('Incorrect email or password');
        }
        const isPassworddMatch = await bcrypt.compare(user.password, existingUser.password);
        if (!isPassworddMatch) {
            throw new common_1.BadRequestException('Incorrect email or password');
        }
        const payload = { email: existingUser.email, id: existingUser._id };
        return {
            access_token: this.jwtService.sign(payload),
            user_id: existingUser._id,
            firstName: existingUser.firstName,
        };
    }
    async createUser(user, imageURL) {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${user.city}&format=json`);
        const existingCity = await response.json();
        if (!existingCity[0]) {
            throw new common_1.BadRequestException('Invalid city name');
        }
        const hash = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hash;
        imageURL ? user.imageURL = imageURL : undefined;
        const doc = new this.userModel(user);
        const newUser = await doc.save();
        const payload = { email: newUser.email, id: newUser._id };
        return {
            access_token: this.jwtService.sign(payload),
            user_id: newUser._id,
            firstName: newUser.firstName,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map