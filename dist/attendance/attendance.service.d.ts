import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
export declare class AttendanceService {
    private readonly attendanceRepository;
    constructor(attendanceRepository: Repository<Attendance>);
    checkIn(createAttendanceDto: any): Promise<{
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
    checkOut(user_id: number, checkOutData: any): Promise<Attendance>;
    findAll(): Promise<Attendance[]>;
    findOne(user_id: number): Promise<{
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
    attendanceHistory(user_id: number, page?: number, limit?: number): Promise<{
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
    getLocationName(lat: number, lng: number): Promise<string | null>;
}
