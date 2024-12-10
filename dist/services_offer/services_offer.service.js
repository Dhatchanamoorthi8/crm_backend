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
exports.ServicesOfferService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const services_offer_entity_1 = require("./entities/services_offer.entity");
const typeorm_2 = require("typeorm");
let ServicesOfferService = class ServicesOfferService {
    constructor(ServiceRepository) {
        this.ServiceRepository = ServiceRepository;
    }
    async create(createServicesOfferDto) {
        const servicename = createServicesOfferDto.servicename;
        const AlreadyExits = await this.ServiceRepository.findOne({ where: { servicename } });
        if (AlreadyExits)
            throw new common_1.ConflictException('This Services already exists');
        const newService = this.ServiceRepository.create({
            servicename: createServicesOfferDto.servicename,
            createdBy: createServicesOfferDto.user_id,
        });
        return this.ServiceRepository.save(newService);
    }
    findAll() {
        return this.ServiceRepository.find({});
    }
    async update(s_id, data) {
        console.log(s_id, data);
        const existingUser = await this.ServiceRepository.findOne({ where: { s_id } });
        if (!existingUser) {
            throw new common_1.NotFoundException(`Service with ID ${s_id} not found`);
        }
        await this.ServiceRepository.update({ s_id }, { servicename: data.servicename });
        return `User with ID ${s_id} has been updated successfully`;
    }
    async remove(s_id) {
        const existingUser = await this.ServiceRepository.findOne({ where: { s_id } });
        if (!existingUser) {
            throw new common_1.NotFoundException(`Service with ID ${s_id} not found`);
        }
        return this.ServiceRepository.delete({ s_id });
    }
};
exports.ServicesOfferService = ServicesOfferService;
exports.ServicesOfferService = ServicesOfferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(services_offer_entity_1.ServicesOffer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesOfferService);
//# sourceMappingURL=services_offer.service.js.map