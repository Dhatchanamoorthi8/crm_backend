import { NotificationService } from './notification.service';
import { SchedulerService } from './scheduler.service';
export declare class NotificationController {
    private readonly notificationService;
    private readonly schedulerService;
    constructor(notificationService: NotificationService, schedulerService: SchedulerService);
    scheduleNotification(payload: any): Promise<{
        message: string;
        notificationId: number;
    }>;
}
