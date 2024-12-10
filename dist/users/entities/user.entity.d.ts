import { Attendance } from "src/attendance/entities/attendance.entity";
import { Companymaster } from "src/companymaster/entities/companymaster.entity";
import { Userdesgination } from "src/userdesgination/entities/userdesgination.entity";
export declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export declare class User {
    user_id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    DOB: Date;
    mobile: string;
    address: string;
    gender: Gender;
    profile: string;
    created_at: Date;
    createdby: number;
    isActive: boolean;
    attendance: Attendance[];
    designation: Userdesgination;
    des_id: number;
    company: Companymaster;
    cm_id: number;
}
