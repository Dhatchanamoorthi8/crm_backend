import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import * as Expo from 'expo-server-sdk';
export declare class NotificationService {
    private readonly notificationRepository;
    private expo;
    constructor(notificationRepository: Repository<Notification>);
    createNotification(notificationData: Partial<Notification>): Notification;
    saveNotification(notification: Notification): Promise<Notification>;
    findNotificationById(id: number): Promise<Notification>;
    sendPushNotification(expoPushToken: string, title: string, body: string): Promise<Expo.ExpoPushTicket[]>;
}
