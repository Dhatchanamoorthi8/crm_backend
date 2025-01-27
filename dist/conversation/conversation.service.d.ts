import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Conversation } from './entities/conversation.entity';
export declare class ConversationService {
    private readonly conversationRepository;
    private readonly userRepository;
    constructor(conversationRepository: Repository<Conversation>, userRepository: Repository<User>);
    createMessage(createConversationDto: CreateConversationDto): Promise<Conversation>;
    fetchMessages(userId: number, recipientId: number): Promise<Conversation[]>;
    updateUserStatus(userid: number, isOnline: boolean, lastSeen: any): Promise<import("typeorm").UpdateResult>;
    getMessages(userId: number, recipientId: number): Promise<Conversation[]>;
    create(createConversationDto: CreateConversationDto): Promise<Conversation>;
    findAll(): string;
    findOne(userid: number, page: number, limit: number, createdby: number): Promise<{
        conversations: Conversation[];
    }>;
    findAllUserListwithmsg(userid: number, page: number, limit: number, viewerType: "user" | "admin"): Promise<{
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
    update(id: number, updateConversationDto: UpdateConversationDto): string;
    remove(id: number): string;
    getUnreadMessages(userId: number, viewerType: "user" | "admin"): Promise<{
        unreadCount: number;
        conversations: any[];
    }>;
    getUnreadMessagesForAdmin(adminId: number): Promise<{
        unreadCount: number;
        conversations: any[];
    }>;
    getUnreadMessagesForUser(userId: number): Promise<{
        unreadCount: number;
        conversations: any[];
    }>;
    getUnreadMessagesForUserData(userId: number): Promise<{
        username: string;
        id: number;
        message: string;
        isUser: boolean;
        isRead: boolean;
        createdAt: Date;
        user: User;
        userid: number;
        sender_type: string;
        createdby: number;
    }[]>;
    markMessagesAsRead(userId: number, viewerType: "user" | "admin"): Promise<void>;
    markMessagesAsReadByone(userId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
