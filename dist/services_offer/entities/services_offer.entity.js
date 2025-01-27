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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesOffer = void 0;
const client_vist_entity_1 = require("../../client_vist/entities/client_vist.entity");
const typeorm_1 = require("typeorm");
let ServicesOffer = class ServicesOffer {
};
exports.ServicesOffer = ServicesOffer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServicesOffer.prototype, "s_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServicesOffer.prototype, "servicename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ServicesOffer.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ServicesOffer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_vist_entity_1.ClientVist, (clientVist) => clientVist.services),
    __metadata("design:type", Array)
], ServicesOffer.prototype, "clientVisits", void 0);
exports.ServicesOffer = ServicesOffer = __decorate([
    (0, typeorm_1.Entity)('service_offer')
], ServicesOffer);
//# sourceMappingURL=services_offer.entity.js.map