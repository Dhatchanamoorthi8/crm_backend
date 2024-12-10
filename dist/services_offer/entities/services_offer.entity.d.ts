import { ClientVist } from "src/client_vist/entities/client_vist.entity";
export declare class ServicesOffer {
    s_id: number;
    servicename: string;
    createdBy: number;
    createdAt: Date;
    clientVisits: ClientVist[];
}
