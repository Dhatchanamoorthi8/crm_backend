import { ServicesOfferService } from './services_offer.service';
import { UpdateServicesOfferDto } from './dto/update-services_offer.dto';
export declare class ServicesOfferController {
    private readonly servicesOfferService;
    constructor(servicesOfferService: ServicesOfferService);
    create(createServicesOfferDto: any): Promise<import("./entities/services_offer.entity").ServicesOffer>;
    findAll(): Promise<import("./entities/services_offer.entity").ServicesOffer[]>;
    update(id: string, updateServicesOfferDto: UpdateServicesOfferDto): Promise<string>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
