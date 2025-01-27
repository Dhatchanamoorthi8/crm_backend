import { User } from "src/users/entities/user.entity";
export declare class UserTask {
    taskid: number;
    Taskname: string;
    TaskStatus: string;
    Description: string;
    taskprofile: string;
    user_id: number;
    createdAt: Date;
    user: User;
}
