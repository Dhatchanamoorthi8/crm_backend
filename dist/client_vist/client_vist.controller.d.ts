import { ClientVistService } from './client_vist.service';
export declare class ClientVistController {
    private readonly clientVistService;
    constructor(clientVistService: ClientVistService);
    newEnquiry(data: any): Promise<import("../client/entities/client.entity").Client | {
        savedClient: import("../client/entities/client.entity").Client;
        savedClientVisit: import("./entities/client_vist.entity").ClientVist;
    }>;
    getOneFollowup(id: number): Promise<{
        followUp: any[];
    }>;
    SaveFollowup(data: {
        FollowupData: any;
        ClientData: any;
        user_id: number;
    }): Promise<import("./entities/client_vist.entity").ClientVist | {
        savedClientVisit: import("./entities/client_vist.entity").ClientVist;
        updateALL: import("typeorm").UpdateResult;
    }>;
    getnewViewClient(id: number): Promise<{
        newClient: any[];
    }>;
}
