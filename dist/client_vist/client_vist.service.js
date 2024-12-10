"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientVistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const client_vist_entity_1 = require("./entities/client_vist.entity");
const typeorm_2 = require("@nestjs/typeorm");
const client_entity_1 = require("../client/entities/client.entity");
const services_offer_entity_1 = require("../services_offer/entities/services_offer.entity");
const date_fns_1 = require("date-fns");
let ClientVistService = class ClientVistService {
    constructor(ClientVistRepository, clientRepository, servicesOfferRepository) {
        this.ClientVistRepository = ClientVistRepository;
        this.clientRepository = clientRepository;
        this.servicesOfferRepository = servicesOfferRepository;
    }
    create(createClientVistDto) {
        const newClientVist = this.ClientVistRepository.create(createClientVistDto);
        return this.ClientVistRepository.save(newClientVist);
    }
    async newEnquiry(data) {
        console.log(data);
        const existingClient = await this.clientRepository.findOne({
            where: {
                email: data.email,
                company_name: data.company_name,
            },
        });
        if (existingClient) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Client with this email already exists',
            }, common_1.HttpStatus.CONFLICT);
        }
        if (data.Followup_type === 'Close') {
            const newClient = this.clientRepository.create({
                company_name: data.company_name,
                client_name: data.client_name,
                client_address: data.client_address,
                contact: data.contact,
                email: data.email,
                created_by: data.user_id,
                services: data.services,
            });
            const savedClient = await this.clientRepository.save(newClient);
            return savedClient;
        }
        const newClient = this.clientRepository.create({
            company_name: data.company_name,
            client_name: data.client_name,
            client_address: data.client_address,
            contact: data.contact,
            email: data.email,
            created_by: data.user_id,
            services: data.services,
        });
        const savedClient = await this.clientRepository.save(newClient);
        const clientId = savedClient.client_id;
        const existingClientVisit = await this.ClientVistRepository.findOne({
            where: { user_id: data.user_id, client_id: clientId },
        });
        if (existingClientVisit) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Client visit for this user and client already exists',
            }, common_1.HttpStatus.CONFLICT);
        }
        const newClientVisit = this.ClientVistRepository.create({
            user_id: Number(data.user_id),
            client_id: Number(clientId),
            services: data.services,
            images: data.images,
            visit_type: data.visit_type,
            Followup_type: data.Followup_type,
            latitude: data.latitude || 0,
            longitude: data.longitude || 0,
            followup_Date: data.followup_Date,
            Status: 'P',
            CallStatus: data.CallStatus,
            Remarks: data.Remarks
        });
        const savedClientVisit = await this.ClientVistRepository.save(newClientVisit);
        return { savedClient, savedClientVisit };
    }
    async FollowUpOneGet(client_id) {
        const followUp = await this.ClientVistRepository.createQueryBuilder('clientVisit')
            .innerJoin('clientVisit.client', 'client')
            .innerJoin('clientVisit.services', 'services')
            .select([
            'clientVisit.cv_id AS cv_id',
            'clientVisit.visit_type AS visit_type',
            'clientVisit.Followup_type AS Followup_type',
            'clientVisit.followup_Date AS followup_Date',
            'clientVisit.latitude AS latitude',
            'clientVisit.longitude AS longitude',
            'clientVisit.Status AS Status',
            'client.company_name AS company_name',
            'client.client_name AS client_name',
            'client.contact AS contact',
            'client.email AS email',
            'services.servicename AS servicename',
        ])
            .where('client.client_id = :client_id', { client_id })
            .getRawMany();
        if (!followUp.length) {
            throw new common_1.NotFoundException(`No follow-ups found for client with ID ${client_id}`);
        }
        return { followUp };
    }
    async FollowUPSave(FollowupData, ClientData, user_id) {
        const client_id = (await this.ClientVistRepository.findOne({ where: { cv_id: ClientData.cv_id } })).client_id;
        const service = FollowupData.Services === '' ? (await this.servicesOfferRepository.findOne({ where: { servicename: ClientData.servicename } })).s_id : FollowupData.Services;
        if (FollowupData.Followup_type === 'ClientApproval') {
            const newEntry = this.ClientVistRepository.create({
                user_id: user_id,
                client_id: Number(client_id),
                services: service,
                images: FollowupData.images,
                visit_type: FollowupData.visit_type,
                Followup_type: FollowupData.Followup_type,
                latitude: FollowupData.latitude || 0,
                longitude: FollowupData.longitude || 0,
                Status: 'C',
                CallStatus: FollowupData.CallStatus,
                TeleCallType: FollowupData.TeleCallMode,
                Remarks: FollowupData.Remarks,
            });
            const savedClientVisit = await this.ClientVistRepository.save(newEntry);
            console.log('Updating rows with:', {
                client_id: Number(client_id),
                user_id: user_id,
            });
            const rowsToUpdate = await this.ClientVistRepository.find({
                where: { client_id: Number(client_id), user_id: user_id },
            });
            console.log('Rows to update:', rowsToUpdate);
            const updateALL = await this.ClientVistRepository.update({ client_id: Number(client_id), user_id: user_id }, { Status: 'C' });
            console.log(updateALL);
            return { savedClientVisit, updateALL };
        }
        if (FollowupData.Followup_type === 'Followup') {
            const newEntry = this.ClientVistRepository.create({
                user_id: user_id,
                client_id: Number(client_id),
                services: service,
                images: FollowupData.images,
                visit_type: FollowupData.visit_type,
                Followup_type: FollowupData.Followup_type,
                latitude: FollowupData.latitude || 0,
                longitude: FollowupData.longitude || 0,
                followup_Date: FollowupData.followup_Date,
                Status: 'P',
                CallStatus: FollowupData.CallStatus,
                TeleCallType: FollowupData.TeleCallMode,
                Remarks: FollowupData.Remarks,
            });
            const savedClientVisit = await this.ClientVistRepository.save(newEntry);
            return savedClientVisit;
        }
    }
    async newClinetView(created_by) {
        const todayStart = (0, date_fns_1.startOfDay)(new Date());
        const todayEnd = (0, date_fns_1.endOfDay)(new Date());
        const newClient = await this.clientRepository.createQueryBuilder('clients')
            .innerJoin('clients.services', 'services')
            .select([
            'clients.company_name AS company_name',
            'clients.client_name AS client_name',
            'clients.contact AS contact',
            'services.servicename AS servicename'
        ])
            .where('clients.created_by = :created_by', { created_by })
            .andWhere('clients.created_at BETWEEN :todayStart AND :todayEnd', { todayStart, todayEnd })
            .orderBy('clients.created_at', 'DESC')
            .getRawMany();
        return { newClient };
    }
};
exports.ClientVistService = ClientVistService;
exports.ClientVistService = ClientVistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(client_vist_entity_1.ClientVist)),
    __param(1, (0, typeorm_2.InjectRepository)(client_entity_1.Client)),
    __param(2, (0, typeorm_2.InjectRepository)(services_offer_entity_1.ServicesOffer)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ClientVistService);
//# sourceMappingURL=client_vist.service.js.map