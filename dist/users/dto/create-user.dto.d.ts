import { Gender } from "../entities/user.entity";
export declare class CreateUserDto {
    name: string;
    email: string;
    mobile: string;
    address: string;
    gender: Gender;
    profile: Gender;
    created_at: Date;
    isActive: boolean;
    des_id: number;
    cm_id: number;
}
