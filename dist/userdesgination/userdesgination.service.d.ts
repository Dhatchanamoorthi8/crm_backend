import { Userdesgination } from './entities/userdesgination.entity';
import { Repository } from 'typeorm';
export declare class UserdesginationService {
    private readonly UserDesRepository;
    constructor(UserDesRepository: Repository<Userdesgination>);
    create(createUserdesginationDto: any): Promise<Userdesgination>;
    findAll(): Promise<Userdesgination[]>;
    update(data: any): Promise<string>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
