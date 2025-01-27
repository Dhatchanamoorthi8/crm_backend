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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("../client/entities/client.entity");
const client_vist_entity_1 = require("../client_vist/entities/client_vist.entity");
const typeorm_2 = require("typeorm");
let DashboardService = class DashboardService {
    constructor(clientRepository, clientVistRepository) {
        this.clientRepository = clientRepository;
        this.clientVistRepository = clientVistRepository;
    }
    async getDashboardCount(userId) {
        const user_id = Number(userId);
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        console.log(userId, formattedDate, "today date");
        const newClientsCount = await this.clientRepository
            .createQueryBuilder('client')
            .where('client.created_by = :user_id', { user_id })
            .andWhere('CONVERT(date, client.created_at) = :formattedDate', { formattedDate })
            .getCount();
        const followUpClients = await this.clientVistRepository
            .createQueryBuilder('clientVist')
            .select(['DISTINCT client.client_id',
            'client.client_id as id',
            'client.company_name AS company_name',
            'client.client_name AS clientName',
            'clientVist.Status AS Status',
            'clientVist.followup_Date AS followupDate'
        ])
            .innerJoin('clientVist.client', 'client')
            .where('clientVist.user_id = :user_id', { user_id })
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where('clientVist.Status = :status', { status: 'P' })
                .andWhere('CONVERT(date, clientVist.followup_Date) <= :formattedDate', { formattedDate });
        }))
            .getRawMany();
        const formattedFollowUpClients = followUpClients.map(client => ({
            id: client.id,
            Status: client.Status,
            company_name: client.company_name,
            client_name: client.clientName,
            followup_Date: new Date(client.followupDate).toISOString().split('T')[0]
        }));
        return {
            newClientsCount: newClientsCount,
            followUpClientsCount: formattedFollowUpClients.length,
            followUpClients: formattedFollowUpClients
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(client_vist_entity_1.ClientVist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map