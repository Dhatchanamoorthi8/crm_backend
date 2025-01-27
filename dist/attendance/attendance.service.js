"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const typeorm_2 = require("typeorm");
const date_fns_1 = require("date-fns");
const axios_1 = require("axios");
const GOOGLE_API_KEY = "AIzaSyA3aVYhBvhxeuW9gm8BfsVmdCVmYhHhQ00";
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async checkIn(createAttendanceDto) {
        const { user_id, intime, latitude, longitude, uniqueid } = createAttendanceDto;
        const todayStart = (0, date_fns_1.startOfDay)(new Date());
        const todayEnd = (0, date_fns_1.endOfDay)(new Date());
        const existingRecord = await this.attendanceRepository.findOne({
            where: {
                user_id,
                intime: (0, typeorm_2.Between)(todayStart, todayEnd),
            },
        });
        if (existingRecord && !existingRecord.outime) {
            throw new common_1.BadRequestException('You must check out before checking in again.');
        }
        if (existingRecord) {
            throw new common_1.BadRequestException('You have already checked in for today.');
        }
        const newAttendance = this.attendanceRepository.create({
            user_id,
            intime,
            latitude,
            longitude,
            DeviceID: uniqueid,
        });
        const savedAttendance = await this.attendanceRepository.save(newAttendance);
        const formattedIntime = (0, date_fns_1.format)(new Date(savedAttendance.intime), 'yyyy-MM-dd hh:mm a');
        return {
            ...savedAttendance,
            formattedIntime,
        };
    }
    async checkOut(user_id, checkOutData) {
        const { Outtime, latitude, longitude, uniqueid } = checkOutData;
        console.log(checkOutData, "checkOutData");
        const attendance = await this.attendanceRepository.findOne({
            where: { user_id, outime: null },
            order: { intime: 'DESC' },
        });
        if (!attendance) {
            throw new Error('No active check-in record found. Please check in first.');
        }
        if (attendance.DeviceID !== uniqueid) {
            throw new Error('Check-out must be performed on the same device as check-in.');
        }
        attendance.outime = Outtime;
        const start = new Date(attendance.intime).getTime();
        const end = new Date(checkOutData.outime).getTime();
        const diffInMillis = end - start;
        attendance.total_hours = Math.round((diffInMillis / (1000 * 60 * 60)) * 100) / 100;
        return this.attendanceRepository.save(attendance);
    }
    findAll() {
        return this.attendanceRepository.find();
    }
    async findOne(user_id) {
        const todayStart = (0, date_fns_1.startOfDay)(new Date());
        const todayEnd = (0, date_fns_1.endOfDay)(new Date());
        const existingRecord = await this.attendanceRepository.findOne({
            where: {
                user_id,
                intime: (0, typeorm_2.Between)(todayStart, todayEnd),
            },
        });
        if (!existingRecord) {
            throw new common_1.NotFoundException('No attendance record found for today.');
        }
        const formattedIntime = (0, date_fns_1.format)(new Date(existingRecord.intime), 'dd-MM-yyyy hh:mm a');
        const formattedOuttime = existingRecord.outime ? (0, date_fns_1.format)(new Date(existingRecord.outime), 'dd-MM-yyyy hh:mm a') : existingRecord.outime;
        let exactWorkingHours = '0h 0m';
        if (existingRecord.intime && existingRecord.outime) {
            const start = new Date(existingRecord.intime).getTime();
            const end = new Date(existingRecord.outime).getTime();
            const diff = end - start;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            exactWorkingHours = `${hours}h ${minutes}m ${seconds}s`;
        }
        return {
            ...existingRecord,
            formattedIntime,
            formattedOuttime,
            exactWorkingHours,
        };
    }
    async attendanceHistory(user_id, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const [attendanceData, total] = await this.attendanceRepository.findAndCount({
            where: { user_id },
            order: { att_id: 'DESC' },
            skip: offset,
            take: limit,
        });
        const enrichedData = await Promise.all(attendanceData.map(async (record) => {
            let locationName = null;
            if (record.latitude && record.longitude) {
                locationName = await this.getLocationName(record.latitude, record.longitude);
            }
            const formattedIntime = record.intime ? (0, date_fns_1.format)(new Date(record.intime), 'h:mm a') : null;
            const formattedOutime = record.outime ? (0, date_fns_1.format)(new Date(record.outime), 'h:mm a') : null;
            const formattedDate = record.created_at ? (0, date_fns_1.format)(new Date(record.created_at), 'MMM d, yyyy') : null;
            return {
                att_id: record.att_id,
                user_id: record.user_id,
                intime: formattedIntime,
                outime: formattedOutime,
                attendance_date: formattedDate,
                location_name: locationName,
                total_hours: record.total_hours,
                DeviceID: record.DeviceID,
            };
        }));
        return {
            data: enrichedData,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getLocationName(lat, lng) {
        try {
            const response = await axios_1.default.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            if (response.data && response.data.display_name) {
                return response.data.display_name;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching location name:", error);
            return null;
        }
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map