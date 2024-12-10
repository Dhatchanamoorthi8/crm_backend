import { ServicesOffer } from './entities/services_offer.entity';
import { Repository } from 'typeorm';
export declare class ServicesOfferService {
    private readonly ServiceRepository;
    constructor(ServiceRepository: Repository<ServicesOffer>);
    create(createServicesOfferDto: any): Promise<ServicesOffer>;
    findAll(): Promise<ServicesOffer[]>;
    update(s_id: number, data: any): Promise<string>;
    remove(s_id: number): Promise<import("typeorm").DeleteResult>;
}
