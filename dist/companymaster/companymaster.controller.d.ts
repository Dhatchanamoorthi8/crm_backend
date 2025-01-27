import { CompanymasterService } from './companymaster.service';
import { CreateCompanymasterDto } from './dto/create-companymaster.dto';
export declare class CompanymasterController {
    private readonly companymasterService;
    constructor(companymasterService: CompanymasterService);
    create(createCompanymasterDto: CreateCompanymasterDto): Promise<import("./entities/companymaster.entity").Companymaster>;
    findAll(): Promise<import("./entities/companymaster.entity").Companymaster[]>;
    update(updateCompanymasterDto: any): Promise<string>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
