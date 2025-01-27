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
exports.ConversationController = void 0;
const common_1 = require("@nestjs/common");
const conversation_service_1 = require("./conversation.service");
const update_conversation_dto_1 = require("./dto/update-conversation.dto");
let ConversationController = class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    create(createConversationDto) {
        console.log(createConversationDto);
        return this.conversationService.create(createConversationDto);
    }
    findAll(userid, page, limit, viewerType) {
        return this.conversationService.findAllUserListwithmsg(+userid, +page, +limit, viewerType);
    }
    findOne(userid, page, limit, createdby) {
        return this.conversationService.findOne(+userid, +page, +limit, +createdby);
    }
    update(id, updateConversationDto) {
        return this.conversationService.update(+id, updateConversationDto);
    }
    remove(id) {
        return this.conversationService.remove(+id);
    }
    async getUnreadMessages(userId, viewerType) {
        const result = await this.conversationService.getUnreadMessages(userId, viewerType);
        return result;
    }
    async markMessagesAsRead(userId, viewerType) {
        await this.conversationService.markMessagesAsRead(userId, viewerType);
        return { success: true };
    }
    async getUnreadMessagesdata(userId) {
        const result = await this.conversationService.getUnreadMessagesForUserData(userId);
        return result;
    }
    async markMessagesAsReadByone(userId) {
        await this.conversationService.markMessagesAsReadByone(userId);
        return { success: true };
    }
};
exports.ConversationController = ConversationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userid')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('viewerType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userid'),
    __param(0, (0, common_1.Param)('userid')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('createdby')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_conversation_dto_1.UpdateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('unread-messages/:userId/:viewerType'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('viewerType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getUnreadMessages", null);
__decorate([
    (0, common_1.Post)('mark-as-read/:userId/:viewerType'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('viewerType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "markMessagesAsRead", null);
__decorate([
    (0, common_1.Get)('unread-messages-users/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getUnreadMessagesdata", null);
__decorate([
    (0, common_1.Post)('mark-as-read-One/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "markMessagesAsReadByone", null);
exports.ConversationController = ConversationController = __decorate([
    (0, common_1.Controller)('conversation'),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationController);
//# sourceMappingURL=conversation.controller.js.map