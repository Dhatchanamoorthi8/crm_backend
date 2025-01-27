import { UserTask } from './entities/user-task.entity';
import { Repository } from 'typeorm';
export declare class UserTaskService {
    private UserTaskRepository;
    constructor(UserTaskRepository: Repository<UserTask>);
    create(createUserTaskDto: any): Promise<any>;
    findAll(): string;
    findOne(user_id: number): Promise<UserTask[]>;
    update(id: number, updateUserTaskDto: any): Promise<import("typeorm").UpdateResult>;
    remove(taskid: number): Promise<import("typeorm").DeleteResult>;
    adminTaskView(user_id: number, mood: string, fromdate: string, todate: string): Promise<UserTask[]>;
}
