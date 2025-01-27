import { User } from "src/users/entities/user.entity";
export declare class Attendance {
    att_id: number;
    user: User;
    user_id: number;
    intime: Date;
    outime: Date;
    latitude: number;
    longitude: number;
    created_at: Date;
    total_hours: number;
    DeviceID: string;
    calculateWorkingHours(): void;
}
