import { Client } from 'src/client/entities/client.entity';
import { ClientVist } from 'src/client_vist/entities/client_vist.entity';
import { Repository } from 'typeorm';
export declare class DashboardService {
    private readonly clientRepository;
    private readonly clientVistRepository;
    constructor(clientRepository: Repository<Client>, clientVistRepository: Repository<ClientVist>);
    getDashboardCount(userId: any): Promise<{
        newClientsCount: number;
        followUpClientsCount: number;
        followUpClients: {
            id: any;
            Status: any;
            company_name: any;
            client_name: any;
            followup_Date: string;
        }[];
    }>;
}
