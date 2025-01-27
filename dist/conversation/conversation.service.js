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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const conversation_entity_1 = require("./entities/conversation.entity");
const date_fns_1 = require("date-fns");
let ConversationService = class ConversationService {
    constructor(conversationRepository, userRepository) {
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }
    async createMessage(createConversationDto) {
        const newConversation = this.conversationRepository.create({
            message: createConversationDto.message,
            isUser: createConversationDto.isUser,
            isRead: createConversationDto.isRead,
            createdAt: createConversationDto.createdAt,
            userid: createConversationDto.userid,
            createdby: createConversationDto.user_id
        });
        const savedConversation = await this.conversationRepository.save(newConversation);
        return savedConversation;
    }
    async fetchMessages(userId, recipientId) {
        return this.conversationRepository.find({
            where: [
                { userid: userId, createdby: recipientId },
                { userid: recipientId, createdby: userId },
            ],
            order: { createdAt: 'DESC' },
        });
    }
    async updateUserStatus(userid, isOnline, lastSeen) {
        return this.userRepository.update({ user_id: userid }, { isOnline, lastOnline: lastSeen });
    }
    getMessages(userId, recipientId) {
        return this.conversationRepository.find({ where: { userid: userId, createdby: recipientId } });
    }
    async create(createConversationDto) {
        const newConversation = this.conversationRepository.create({
            message: createConversationDto.message,
            isUser: createConversationDto.isUser,
            isRead: createConversationDto.isRead,
            createdAt: createConversationDto.createdAt,
            userid: createConversationDto.userid,
            createdby: createConversationDto.user_id
        });
        const savedConversation = await this.conversationRepository.save(newConversation);
        return savedConversation;
    }
    findAll() {
        return `This action returns all conversation`;
    }
    async findOne(userid, page, limit, createdby) {
        console.log(userid, page, limit, createdby);
        const offset = (page - 1) * limit;
        const conversations = await this.conversationRepository.find({
            where: [
                { userid: userid, createdby: createdby },
                { userid: createdby, createdby: userid },
            ],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
        return {
            conversations: conversations,
        };
    }
    async findAllUserListwithmsg(userid, page, limit, viewerType) {
        const offset = (page - 1) * limit;
        const userRole = viewerType === "admin" ? "user" : "admin";
        const users = await this.userRepository.find({
            take: limit,
            skip: offset,
            where: { role: userRole },
            select: [
                "user_id",
                "name",
                "profile",
                "isActive",
                "isOnline",
                "lastOnline",
            ],
        });
        if (users.length === 0) {
            return [];
        }
        const userIds = users.map((user) => user.user_id);
        const conversations = await this.conversationRepository
            .createQueryBuilder("conversation")
            .select([
            "conversation.createdby AS createdby",
            "conversation.message AS message",
            "conversation.createdAt AS createdAt",
        ])
            .where("conversation.createdby IN (:...userIds)", { userIds })
            .orderBy("conversation.createdAt", "DESC")
            .getRawMany();
        const unreadCounts = await this.conversationRepository
            .createQueryBuilder("conversation")
            .select([
            "conversation.createdby AS createdby",
            "COUNT(*) AS unreadCount",
        ])
            .where("conversation.userid = :userid", { userid })
            .andWhere("conversation.isRead = :isRead", { isRead: false })
            .groupBy("conversation.createdby")
            .getRawMany();
        const conversationMap = conversations.reduce((map, convo) => {
            if (!map[convo.createdby]) {
                map[convo.createdby] = convo;
            }
            return map;
        }, {});
        const unreadCountMap = unreadCounts.reduce((map, unread) => {
            map[unread.createdby] = parseInt(unread.unreadCount, 10) || 0;
            return map;
        }, {});
        const result = users.map((user) => {
            const lastConversation = conversationMap[user.user_id] || {};
            const unreadCount = unreadCountMap[user.user_id] || 0;
            return {
                userId: user.user_id,
                username: user.name,
                profile: user.profile,
                isactive: user.isActive,
                isOnline: user.isOnline,
                lastOnline: user.isOnline ? "Online" : user.lastOnline,
                lastMessage: lastConversation.message || "No messages found",
                createdAt: lastConversation.createdAt || null,
                formattedCreatedAt: lastConversation.createdAt
                    ? (0, date_fns_1.format)(new Date(lastConversation.createdAt), "MMM dd yyyy hh:mm a")
                    : null,
                unreadCount,
            };
        });
        const sortedResult = result.sort((a, b) => {
            if (!a.createdAt && !b.createdAt)
                return 0;
            if (!a.createdAt)
                return 1;
            if (!b.createdAt)
                return -1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        return sortedResult;
    }
    update(id, updateConversationDto) {
        return `This action updates a #${id} conversation`;
    }
    remove(id) {
        return `This action removes a #${id} conversation`;
    }
    async getUnreadMessages(userId, viewerType) {
        if (viewerType === "user") {
            return this.getUnreadMessagesForUser(userId);
        }
        else {
            return this.getUnreadMessagesForAdmin(userId);
        }
    }
    async getUnreadMessagesForAdmin(adminId) {
        const query = this.conversationRepository.createQueryBuilder("conversation")
            .select("COUNT(*)", "unreadCount")
            .where("conversation.isRead = :isRead", { isRead: false })
            .andWhere("conversation.createdby != :adminId", { adminId });
        const result = await query.getRawOne();
        const unreadCount = parseInt(result?.unreadCount || "0", 10);
        const conversations = await this.conversationRepository.find({
            where: { createdby: (0, typeorm_2.Not)(adminId), isRead: false, isUser: true },
            order: { createdAt: 'ASC' },
        });
        const conversationsWithUsernames = await Promise.all(conversations.map(async (conversation) => {
            const createdByUser = await this.userRepository.findOne({ where: { user_id: conversation.createdby } });
            return {
                ...conversation,
                username: createdByUser ? createdByUser.name : 'Unknown',
                formattedCreatedAt: (0, date_fns_1.format)(conversation.createdAt, 'MMM dd yyyy hh:mm a'),
            };
        }));
        return { unreadCount, conversations: conversationsWithUsernames };
    }
    async getUnreadMessagesForUser(userId) {
        const unreadCountQuery = this.conversationRepository.createQueryBuilder("conversation")
            .select("COUNT(*)", "unreadCount")
            .where("conversation.isRead = :isRead", { isRead: false })
            .andWhere("conversation.userid = :userId", { userId })
            .andWhere("conversation.createdby != :userId", { userId });
        const result = await unreadCountQuery.getRawOne();
        const unreadCount = parseInt(result?.unreadCount || "0", 10);
        const conversations = await this.conversationRepository.find({
            where: { userid: userId, isRead: false, isUser: false },
            order: { createdAt: 'ASC' },
        });
        const conversationsWithUsernames = await Promise.all(conversations.map(async (conversation) => {
            const createdByUser = await this.userRepository.findOne({ where: { user_id: conversation.createdby } });
            return {
                ...conversation,
                username: createdByUser ? createdByUser.name : 'Unknown',
                formattedCreatedAt: (0, date_fns_1.format)(conversation.createdAt, 'MMM dd yyyy hh:mm a'),
            };
        }));
        return { unreadCount, conversations: conversationsWithUsernames };
    }
    async getUnreadMessagesForUserData(userId) {
        const user = await this.userRepository.findOne({ where: { user_id: userId } });
        const conversations = await this.conversationRepository.find({
            where: { userid: userId, isRead: false, isUser: false },
            order: { createdAt: 'ASC' },
        });
        return conversations.map((conversation) => {
            return {
                ...conversation,
                username: user.name || 'Unknown',
            };
        });
    }
    async markMessagesAsRead(userId, viewerType) {
        const query = this.conversationRepository.createQueryBuilder()
            .update("Conversation")
            .set({ isRead: true });
        if (viewerType === "user") {
            query.where("userid = :userId", { userId })
                .andWhere("createdby != :userId", { userId });
        }
        else {
            query.where("userid = :userId", { userId })
                .andWhere("createdby = :userId", { userId });
        }
        await query.execute();
    }
    async markMessagesAsReadByone(userId) {
        try {
            console.log(userId, 'mark as read');
            const notifications = await this.conversationRepository.find({
                where: { isRead: false, userid: userId },
            });
            notifications.forEach(notification => {
                notification.isRead = true;
            });
            await this.conversationRepository.save(notifications);
            return { success: true, message: 'Notifications marked as read' };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error marking notifications as read');
        }
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map