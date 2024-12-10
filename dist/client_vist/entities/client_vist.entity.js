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
exports.ClientVist = void 0;
const class_validator_1 = require("class-validator");
const client_entity_1 = require("../../client/entities/client.entity");
const services_offer_entity_1 = require("../../services_offer/entities/services_offer.entity");
const typeorm_1 = require("typeorm");
let ClientVist = class ClientVist {
};
exports.ClientVist = ClientVist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClientVist.prototype, "cv_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClientVist.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClientVist.prototype, "client_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ClientVist.prototype, "conversation_sttime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ClientVist.prototype, "conversation_endtime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => services_offer_entity_1.ServicesOffer, (servicesOffer) => servicesOffer.clientVisits, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 's_id' }),
    __metadata("design:type", services_offer_entity_1.ServicesOffer)
], ClientVist.prototype, "services", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ClientVist.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientVist.prototype, "visit_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClientVist.prototype, "TeleCallType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClientVist.prototype, "CallStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientVist.prototype, "Followup_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7 }),
    __metadata("design:type", Number)
], ClientVist.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7 }),
    __metadata("design:type", Number)
], ClientVist.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClientVist.prototype, "Status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ClientVist.prototype, "followup_Date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ClientVist.prototype, "Remarks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ClientVist.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, client => client.clientVists),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], ClientVist.prototype, "client", void 0);
exports.ClientVist = ClientVist = __decorate([
    (0, typeorm_1.Entity)('client_Vist')
], ClientVist);
//# sourceMappingURL=client_vist.entity.js.map