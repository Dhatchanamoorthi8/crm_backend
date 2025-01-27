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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const conversation_service_1 = require("../conversation/conversation.service");
let ConversationGateway = class ConversationGateway {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    async handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        const { userid } = client.handshake.query;
        console.log(userid, 'userid');
        if (!userid) {
            console.error('Missing userid in handshake query');
            client.disconnect();
            return;
        }
        await this.conversationService.updateUserStatus(Number(userid), true, new Date());
        this.server.emit('userStatusChange', { userid, status: 'online' });
    }
    async handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        const { userid } = client.handshake.query;
        if (!userid)
            return;
        await this.conversationService.updateUserStatus(Number(userid), false, new Date());
        this.server.emit('userStatusChange', { userid, status: 'offline', lastSeen: new Date() });
    }
    async handleReconnect(client) {
        console.log(`Client reconnected: ${client.id}`);
        const userid = client.data.userid;
        const createdby = client.data.createdby;
        if (userid && createdby) {
            client.join(String(userid));
            await this.conversationService.updateUserStatus(userid, true, new Date());
            const messages = await this.conversationService.fetchMessages(userid, createdby);
            client.emit('chatHistory', messages);
            console.log(`Client ${client.id} rejoined room for user ${userid} and sender ${createdby}`);
        }
    }
    async handleMessage(client, payload) {
        console.log('Received message:', payload);
        const newMessage = await this.conversationService.createMessage({
            message: payload.message,
            userid: payload.userid,
            createdby: payload.createdby,
            isRead: false,
            createdAt: new Date(),
            sender_type: '',
            isUser: payload.isUser,
            user_id: payload.createdby,
        });
        this.server.to(String(payload.userid)).emit('receiveMessage', newMessage);
        this.server.to(String(payload.createdby)).emit('receiveMessage', newMessage);
        console.log(`Message sent to user ${payload.userid} and recipient ${payload.createdby}`);
    }
    async handleJoinRoom(client, payload) {
        console.log(payload, 'joinRoom');
        if (!payload.userid || !payload.createdby) {
            console.error('Invalid payload: Missing userid or createdby');
            client.disconnect();
            return;
        }
        client.join(String(payload.userid));
        const messages = await this.conversationService.fetchMessages(payload.userid, payload.createdby);
        client.emit('chatHistory', messages);
        console.log(`Client ${client.id} joined room for user ${payload.userid} and sender ${payload.createdby}`);
    }
};
exports.ConversationGateway = ConversationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ConversationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('reconnect'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ConversationGateway.prototype, "handleReconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ConversationGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ConversationGateway.prototype, "handleJoinRoom", null);
exports.ConversationGateway = ConversationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationGateway);
//# sourceMappingURL=websocket.gateway.js.map