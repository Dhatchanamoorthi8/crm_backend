import { UserdesginationService } from './userdesgination.service';
export declare class UserdesginationController {
    private readonly userdesginationService;
    constructor(userdesginationService: UserdesginationService);
    create(createUserdesginationDto: any): Promise<import("./entities/userdesgination.entity").Userdesgination>;
    findAll(): Promise<import("./entities/userdesgination.entity").Userdesgination[]>;
    update(updateUserdesginationDto: any): Promise<string>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
