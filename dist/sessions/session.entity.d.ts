import { User } from 'src/users/entities/user.entity';
export declare class UserSession {
    id: string;
    user: User;
    deviceId: string;
    deviceInfo: string;
    ipAddress: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
    user_id: number;
}
