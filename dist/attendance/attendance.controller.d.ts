import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: any): Promise<{
        formattedIntime: string;
        att_id: number;
        user: import("../users/entities/user.entity").User;
        user_id: number;
        intime: Date;
        outime: Date;
        latitude: number;
        longitude: number;
        created_at: Date;
        total_hours: number;
        DeviceID: string;
    }>;
    update(id: any, checkOutData: any): Promise<import("./entities/attendance.entity").Attendance>;
    findOne(id: string): Promise<{
        formattedIntime: string;
        formattedOuttime: string | Date;
        exactWorkingHours: string;
        att_id: number;
        user: import("../users/entities/user.entity").User;
        user_id: number;
        intime: Date;
        outime: Date;
        latitude: number;
        longitude: number;
        created_at: Date;
        total_hours: number;
        DeviceID: string;
    }>;
    findOneHistory(id: string, page: number, limit: number): Promise<{
        data: {
            att_id: number;
            user_id: number;
            intime: string;
            outime: string;
            attendance_date: string;
            location_name: any;
            total_hours: number;
            DeviceID: string;
        }[];
        total: number;
        currentPage: number;
        totalPages: number;
    }>;
}
