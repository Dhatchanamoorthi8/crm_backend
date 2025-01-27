import { UserTaskService } from './user-task.service';
export declare class UserTaskController {
    private readonly userTaskService;
    constructor(userTaskService: UserTaskService);
    create(createUserTaskDto: any): Promise<any>;
    findAll(): string;
    findOne(id: string): Promise<import("./entities/user-task.entity").UserTask[]>;
    update(id: string, updateUserTaskDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    adminTaskView(id: string, mood: string, fromdate: string, todate: string): Promise<import("./entities/user-task.entity").UserTask[]>;
}
