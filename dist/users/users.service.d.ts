import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly UserRepository;
    constructor(UserRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    create(createUserDto: any): Promise<User>;
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
    findOne(user_id: number): Promise<{
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
    update(user_id: number, updateUserDto: UpdateUserDto): Promise<string>;
    remove(user_id: number): Promise<import("typeorm").DeleteResult>;
    isActiveuser(user_id: number, mood: string): Promise<import("typeorm").UpdateResult>;
}
