"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientVistModule = void 0;
const common_1 = require("@nestjs/common");
const client_vist_service_1 = require("./client_vist.service");
const client_vist_controller_1 = require("./client_vist.controller");
const typeorm_1 = require("@nestjs/typeorm");
const client_vist_entity_1 = require("./entities/client_vist.entity");
const client_module_1 = require("../client/client.module");
const client_entity_1 = require("../client/entities/client.entity");
const services_offer_entity_1 = require("../services_offer/entities/services_offer.entity");
let ClientVistModule = class ClientVistModule {
};
exports.ClientVistModule = ClientVistModule;
exports.ClientVistModule = ClientVistModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_vist_entity_1.ClientVist, client_entity_1.Client, services_offer_entity_1.ServicesOffer]), client_module_1.ClientModule],
        controllers: [client_vist_controller_1.ClientVistController],
        providers: [client_vist_service_1.ClientVistService],
    })
], ClientVistModule);
//# sourceMappingURL=client_vist.module.js.map