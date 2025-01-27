import { Client } from "src/client/entities/client.entity";
import { ServicesOffer } from "src/services_offer/entities/services_offer.entity";
export declare class ClientVist {
    cv_id: number;
    user_id: number;
    client_id: number;
    conversation_sttime: number;
    conversation_endtime: number;
    services: ServicesOffer;
    images: string;
    visit_type: string;
    TeleCallType: string;
    CallStatus: string;
    Followup_type: string;
    latitude: number;
    longitude: number;
    Status: string;
    followup_Date: Date;
    Remarks: string;
    created_at: Date;
    client: Client;
}
