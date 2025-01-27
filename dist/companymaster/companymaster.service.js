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
exports.CompanymasterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const companymaster_entity_1 = require("./entities/companymaster.entity");
const typeorm_2 = require("typeorm");
let CompanymasterService = class CompanymasterService {
    constructor(CompanyRepository) {
        this.CompanyRepository = CompanyRepository;
    }
    async create(props) {
        const exitsComapny = await this.CompanyRepository.findOne({ where: { CompanyName: props.CompanyName } });
        if (exitsComapny)
            throw new common_1.ConflictException('This Company Name already exists');
        const newComapny = this.CompanyRepository.create({
            CompanyName: props.CompanyName,
            createdby: props.user_id
        });
        return this.CompanyRepository.save(newComapny);
    }
    findAll() {
        return this.CompanyRepository.find({});
    }
    async update(data) {
        const existingData = await this.CompanyRepository.findOne({ where: { cm_id: data.cm_id } });
        if (!existingData)
            throw new common_1.NotFoundException(`Desgination with ID ${data.cm_id} not found`);
        await this.CompanyRepository.update({ cm_id: data.cm_id }, { CompanyName: data.CompanyName });
        return `User with ID ${data.Des_id} has been updated successfully`;
    }
    async remove(id) {
        const existingData = await this.CompanyRepository.findOne({ where: { cm_id: id } });
        if (!existingData)
            throw new common_1.NotFoundException(`Desgination with ID ${id} not found`);
        return await this.CompanyRepository.delete({ cm_id: id });
    }
};
exports.CompanymasterService = CompanymasterService;
exports.CompanymasterService = CompanymasterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(companymaster_entity_1.Companymaster)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanymasterService);
//# sourceMappingURL=companymaster.service.js.map