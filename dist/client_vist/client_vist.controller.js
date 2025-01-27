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
exports.ClientVistController = void 0;
const common_1 = require("@nestjs/common");
const client_vist_service_1 = require("./client_vist.service");
const swagger_1 = require("@nestjs/swagger");
let ClientVistController = class ClientVistController {
    constructor(clientVistService) {
        this.clientVistService = clientVistService;
    }
    newEnquiry(data) {
        return this.clientVistService.newEnquiry(data);
    }
    getOneFollowup(id) {
        return this.clientVistService.FollowUpOneGet(id);
    }
    SaveFollowup(data) {
        const { FollowupData, ClientData, user_id } = data;
        return this.clientVistService.FollowUPSave(FollowupData, ClientData, user_id);
    }
    getnewViewClient(id) {
        return this.clientVistService.newClinetView(id);
    }
};
exports.ClientVistController = ClientVistController;
__decorate([
    (0, common_1.Post)('newenquiry'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientVistController.prototype, "newEnquiry", null);
__decorate([
    (0, common_1.Get)('FollowpGetOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientVistController.prototype, "getOneFollowup", null);
__decorate([
    (0, common_1.Post)('FollowUpSave'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientVistController.prototype, "SaveFollowup", null);
__decorate([
    (0, common_1.Get)('newClientView/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientVistController.prototype, "getnewViewClient", null);
exports.ClientVistController = ClientVistController = __decorate([
    (0, swagger_1.ApiTags)('client-vist'),
    (0, common_1.Controller)('client-vist'),
    __metadata("design:paramtypes", [client_vist_service_1.ClientVistService])
], ClientVistController);
//# sourceMappingURL=client_vist.controller.js.map