import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
export declare class ClientService {
    private readonly ClientRepository;
    constructor(ClientRepository: Repository<Client>);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(client_id: number): Promise<Client>;
    update(client_id: number, updateClientDto: UpdateClientDto): Promise<Client>;
    remove(client_id: number): Promise<Client>;
}
