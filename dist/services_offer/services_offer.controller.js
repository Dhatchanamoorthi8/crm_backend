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
exports.ServicesOfferController = void 0;
const common_1 = require("@nestjs/common");
const services_offer_service_1 = require("./services_offer.service");
const update_services_offer_dto_1 = require("./dto/update-services_offer.dto");
const swagger_1 = require("@nestjs/swagger");
let ServicesOfferController = class ServicesOfferController {
    constructor(servicesOfferService) {
        this.servicesOfferService = servicesOfferService;
    }
    create(createServicesOfferDto) {
        return this.servicesOfferService.create(createServicesOfferDto);
    }
    findAll() {
        return this.servicesOfferService.findAll();
    }
    update(id, updateServicesOfferDto) {
        return this.servicesOfferService.update(+id, updateServicesOfferDto);
    }
    remove(id) {
        return this.servicesOfferService.remove(+id);
    }
};
exports.ServicesOfferController = ServicesOfferController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServicesOfferController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesOfferController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_services_offer_dto_1.UpdateServicesOfferDto]),
    __metadata("design:returntype", void 0)
], ServicesOfferController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesOfferController.prototype, "remove", null);
exports.ServicesOfferController = ServicesOfferController = __decorate([
    (0, swagger_1.ApiTags)('services-offer'),
    (0, common_1.Controller)('services-offer'),
    __metadata("design:paramtypes", [services_offer_service_1.ServicesOfferService])
], ServicesOfferController);
//# sourceMappingURL=services_offer.controller.js.map