import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<{
        user_id: number;
        name: string;
        email: string;
        DOB: string;
        profile: string;
        currentYear: number;
        age: number;
        mobile: string;
        designationName: string;
        companyName: string;
        isactive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        user_id: number;
        name: string;
        email: string;
        gender: import("./entities/user.entity").Gender;
        DOB: string;
        dateofbirth: Date;
        profile: string;
        currentYear: number;
        age: number;
        mobile: string;
        designationName: string;
        companyName: string;
    }[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<string>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    isActiveuser(id: string, mood: string): Promise<import("typeorm").UpdateResult>;
}
