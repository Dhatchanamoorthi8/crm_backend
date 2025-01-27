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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const scheduler_service_1 = require("./scheduler.service");
let NotificationController = class NotificationController {
    constructor(notificationService, schedulerService) {
        this.notificationService = notificationService;
        this.schedulerService = schedulerService;
    }
    async scheduleNotification(payload) {
        console.log('Payload received:', payload);
        const { userId, expoPushToken, title, body, scheduleDateTime } = payload;
        if (!userId || !expoPushToken || !title || !body || !scheduleDateTime) {
            throw new common_1.HttpException('Missing required fields: userId, expoPushToken, title, body, or scheduleDateTime', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const notification = this.notificationService.createNotification({
                userId,
                expoPushToken,
                notificationTitle: title,
                notificationBody: body,
                scheduleDateTime: new Date(scheduleDateTime),
            });
            const savedNotification = await this.notificationService.saveNotification(notification);
            await this.schedulerService.scheduleNotification(savedNotification);
            console.log('successfully reguster');
            return {
                message: 'Notification scheduled successfully!',
                notificationId: savedNotification.id,
            };
        }
        catch (error) {
            console.error('Error scheduling notification:', error);
            throw new common_1.HttpException(`Failed to schedule notification: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)('schedule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "scheduleNotification", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        scheduler_service_1.SchedulerService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map