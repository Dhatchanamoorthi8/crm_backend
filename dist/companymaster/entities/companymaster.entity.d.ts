import { User } from "src/users/entities/user.entity";
export declare class Companymaster {
    cm_id: number;
    CompanyName: string;
    created_at: Date;
    createdby: number;
    users: User[];
}
