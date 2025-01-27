import { User } from "src/users/entities/user.entity";
export declare class Conversation {
    id: number;
    message: string;
    isUser: boolean;
    isRead: boolean;
    createdAt: Date;
    user: User;
    userid: number;
    sender_type: string;
    createdby: number;
}
