import { ConversationService } from './conversation.service';
import { UpdateConversationDto } from './dto/update-conversation.dto';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    create(createConversationDto: any): Promise<import("./entities/conversation.entity").Conversation>;
    findAll(userid: string, page: string, limit: string, viewerType: "user" | "admin"): Promise<{
        userId: number;
        username: string;
        profile: string;
        isactive: boolean;
        isOnline: boolean;
        lastOnline: string | Date;
        lastMessage: any;
        createdAt: any;
        formattedCreatedAt: string;
        unreadCount: any;
    }[]>;
    findOne(userid: string, page: string, limit: string, createdby: string): Promise<{
        conversations: import("./entities/conversation.entity").Conversation[];
    }>;
    update(id: string, updateConversationDto: UpdateConversationDto): string;
    remove(id: string): string;
    getUnreadMessages(userId: number, viewerType: "user" | "admin"): Promise<{
        unreadCount: number;
        conversations: any[];
    }>;
    markMessagesAsRead(userId: number, viewerType: "user" | "admin"): Promise<{
        success: boolean;
    }>;
    getUnreadMessagesdata(userId: number): Promise<{
        username: string;
        id: number;
        message: string;
        isUser: boolean;
        isRead: boolean;
        createdAt: Date;
        user: import("../users/entities/user.entity").User;
        userid: number;
        sender_type: string;
        createdby: number;
    }[]>;
    markMessagesAsReadByone(userId: number): Promise<{
        success: boolean;
    }>;
}
