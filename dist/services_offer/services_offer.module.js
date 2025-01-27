"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesOfferModule = void 0;
const common_1 = require("@nestjs/common");
const services_offer_service_1 = require("./services_offer.service");
const services_offer_controller_1 = require("./services_offer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const services_offer_entity_1 = require("./entities/services_offer.entity");
let ServicesOfferModule = class ServicesOfferModule {
};
exports.ServicesOfferModule = ServicesOfferModule;
exports.ServicesOfferModule = ServicesOfferModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([services_offer_entity_1.ServicesOffer])],
        controllers: [services_offer_controller_1.ServicesOfferController],
        providers: [services_offer_service_1.ServicesOfferService],
    })
], ServicesOfferModule);
//# sourceMappingURL=services_offer.module.js.map