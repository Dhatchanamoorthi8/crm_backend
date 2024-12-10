import { Companymaster } from './entities/companymaster.entity';
import { Repository } from 'typeorm';
export declare class CompanymasterService {
    private readonly CompanyRepository;
    constructor(CompanyRepository: Repository<Companymaster>);
    create(props: any): Promise<Companymaster>;
    findAll(): Promise<Companymaster[]>;
    update(data: any): Promise<string>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
