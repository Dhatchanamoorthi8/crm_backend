import { Repository } from 'typeorm';
import { UserSession } from './session.entity';
export declare class SessionsService {
    private sessionsRepository;
    constructor(sessionsRepository: Repository<UserSession>);
    createSession(sessionData: Partial<UserSession>): Promise<UserSession>;
    getSessionsByUser(userId: string): Promise<UserSession[]>;
    deleteSessionByDeviceId(userId: string, deviceId: string): Promise<void>;
    findSessionByTokenAndDevice(token: string, deviceId: string): Promise<UserSession>;
}
