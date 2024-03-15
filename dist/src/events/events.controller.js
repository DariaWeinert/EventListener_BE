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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_event_dto_1 = require("./dto/update-event.dto");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async getAll() {
        return await this.eventsService.getAll();
    }
    async getEventByID(id) {
        return await this.eventsService.getEventByID(id);
    }
    async getEventsByCreator(req, id) {
        if (id === req.user.id) {
            return await this.eventsService.getEventsByCreator(id);
        }
        else {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async createEvent(req, createEventDto) {
        createEventDto.creator = req.user.id;
        const newEvent = await this.eventsService.createEvent(createEventDto);
        const newEventID = newEvent._id.toString();
        const e = await this.eventsService.joinEvent(newEventID, req.user.id);
        return e;
    }
    async updateEvent(req, updateEventDto, id) {
        const isUserCreator = await this.eventsService.isCreator(req.user.id, id);
        if (!isUserCreator) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        else {
            return this.eventsService.updateEvent(id, updateEventDto);
        }
    }
    async deleteEvent(req, id) {
        const isUserCreator = await this.eventsService.isCreator(req.user.id, id);
        if (!isUserCreator) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        else {
            return this.eventsService.deleteEvent(id);
        }
    }
    async joinEvent(req, id) {
        const isMemberInEvent = await this.eventsService.isMember(req.user.id, id);
        const isEventExpire = await this.eventsService.isExpire(id);
        const e = await this.eventsService.getEventByID(id);
        const currentMembersAmount = e.joinedBy.length;
        if (currentMembersAmount >= e.membersAmount) {
            throw new common_1.BadRequestException('Event is full');
        }
        if (isMemberInEvent) {
            throw new common_1.BadRequestException('You are already a participant of this event');
        }
        else {
            if (isEventExpire) {
                throw new common_1.BadRequestException('Event is expired');
            }
            else {
                return this.eventsService.joinEvent(id, req.user.id);
            }
        }
    }
    async leaveEvent(req, id) {
        const isMemberInEvent = await this.eventsService.isMember(req.user.id, id);
        if (!isMemberInEvent) {
            throw new common_1.BadRequestException(`You are not a participant`);
        }
        const isUserCreator = await this.eventsService.isCreator(req.user.id, id);
        if (isUserCreator) {
            throw new common_1.BadRequestException(`Creator can't leave his own event`);
        }
        else {
            return this.eventsService.leaveEvent(id, req.user.id);
        }
    }
    async saveEvent(req, id) {
        return this.eventsService.saveEvent(id, req.user.id);
    }
    async unsaveEvent(req, id) {
        return this.eventsService.unsaveEvent(id, req.user.id);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEventByID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/created/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEventsByCreator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_event_dto_1.UpdateEventDto, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/join/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/leave/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "leaveEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/save/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "saveEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/unsave/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "unsaveEvent", null);
exports.EventsController = EventsController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map