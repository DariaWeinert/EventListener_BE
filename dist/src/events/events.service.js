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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EventsService = class EventsService {
    constructor(eventModel, userModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
    }
    async getAll() {
        return await this.eventModel.find().exec();
    }
    async getEventByID(id) {
        return await this.eventModel.findOne({ _id: id }).populate('joinedBy').populate('creator').exec();
    }
    async getEventsByCreator(id) {
        return await this.eventModel.find({ creator: id }).exec();
    }
    async createEvent(event) {
        const newEvent = new this.eventModel(event);
        return await newEvent.save();
    }
    async updateEvent(id, event) {
        return await this.eventModel.findByIdAndUpdate(id, event, { new: true });
    }
    async deleteEvent(id) {
        return await this.eventModel.findByIdAndDelete(id);
    }
    async joinEvent(eventID, userID) {
        await this.userModel.findByIdAndUpdate(userID, { $push: { "joinedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $push: { "joinedBy": userID } }, { new: true });
    }
    async leaveEvent(eventID, userID) {
        await this.userModel.findByIdAndUpdate(userID, { $pull: { "joinedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $pull: { "joinedBy": userID } }, { new: true });
    }
    async isMember(userID, eventID) {
        return await this.eventModel.findOne({ "_id": eventID, "joinedBy": userID });
    }
    async isExpire(eventID) {
        const now = Date.now();
        return await this.eventModel.findOne({ "_id": eventID, "date": { $lt: now } });
    }
    async isCreator(userID, eventID) {
        return await this.eventModel.findOne({ "_id": eventID, "creator": userID });
    }
    async saveEvent(eventID, userID) {
        await this.userModel.findByIdAndUpdate(userID, { $push: { "savedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $push: { "savedBy": userID } }, { new: true });
    }
    async unsaveEvent(eventID, userID) {
        await this.userModel.findByIdAndUpdate(userID, { $pull: { "savedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $pull: { "savedBy": userID } }, { new: true });
    }
    async isSaved(userID, eventID) {
        return await this.eventModel.findOne({ "_id": eventID, "savedBy": userID });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Event.name)),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EventsService);
//# sourceMappingURL=events.service.js.map