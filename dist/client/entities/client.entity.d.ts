import { ClientVist } from 'src/client_vist/entities/client_vist.entity';
import { ServicesOffer } from 'src/services_offer/entities/services_offer.entity';
export declare class Client {
    client_id: number;
    company_name: string;
    client_name: string;
    client_address: string;
    contact: string;
    email: string;
    created_by: number;
    created_at: Date;
    clientVists: ClientVist[];
    services: ServicesOffer;
}
