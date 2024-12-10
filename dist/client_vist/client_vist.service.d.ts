import { CreateClientVistDto } from './dto/create-client_vist.dto';
import { Repository } from 'typeorm';
import { ClientVist } from './entities/client_vist.entity';
import { Client } from 'src/client/entities/client.entity';
import { ServicesOffer } from 'src/services_offer/entities/services_offer.entity';
export declare class ClientVistService {
    private readonly ClientVistRepository;
    private readonly clientRepository;
    private readonly servicesOfferRepository;
    constructor(ClientVistRepository: Repository<ClientVist>, clientRepository: Repository<Client>, servicesOfferRepository: Repository<ServicesOffer>);
    create(createClientVistDto: CreateClientVistDto): Promise<ClientVist>;
    newEnquiry(data: CreateClientVistDto): Promise<Client | {
        savedClient: Client;
        savedClientVisit: ClientVist;
    }>;
    FollowUpOneGet(client_id: number): Promise<{
        followUp: any[];
    }>;
    FollowUPSave(FollowupData: any, ClientData: any, user_id: number): Promise<ClientVist | {
        savedClientVisit: ClientVist;
        updateALL: import("typeorm").UpdateResult;
    }>;
    newClinetView(created_by: number): Promise<{
        newClient: any[];
    }>;
}
