import { NotificationService } from './notification.service';
export declare class SchedulerService {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    scheduleNotification(notification: any): Promise<void>;
}
