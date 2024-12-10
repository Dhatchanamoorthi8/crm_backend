import { CreateClientDto } from "src/client/dto/create-client.dto";
import { ServicesOffer } from "src/services_offer/entities/services_offer.entity";
export declare class CreateClientVistDto extends CreateClientDto {
    user_id: number;
    client_id: number;
    conversation_sttime: number;
    conversation_endtime: number;
    services: ServicesOffer;
    images: string;
    visit_type: string;
    Followup_type: string;
    CallStatus: string;
    latitude: number;
    longitude: number;
    Status: string;
    followup_Date: Date;
    Remarks: string;
}
