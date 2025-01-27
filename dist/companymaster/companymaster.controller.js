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
exports.CompanymasterController = void 0;
const common_1 = require("@nestjs/common");
const companymaster_service_1 = require("./companymaster.service");
const create_companymaster_dto_1 = require("./dto/create-companymaster.dto");
let CompanymasterController = class CompanymasterController {
    constructor(companymasterService) {
        this.companymasterService = companymasterService;
    }
    create(createCompanymasterDto) {
        return this.companymasterService.create(createCompanymasterDto);
    }
    findAll() {
        return this.companymasterService.findAll();
    }
    update(updateCompanymasterDto) {
        console.log(updateCompanymasterDto);
        return this.companymasterService.update(updateCompanymasterDto);
    }
    remove(id) {
        return this.companymasterService.remove(+id);
    }
};
exports.CompanymasterController = CompanymasterController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_companymaster_dto_1.CreateCompanymasterDto]),
    __metadata("design:returntype", void 0)
], CompanymasterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanymasterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CompanymasterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanymasterController.prototype, "remove", null);
exports.CompanymasterController = CompanymasterController = __decorate([
    (0, common_1.Controller)('companymaster'),
    __metadata("design:paramtypes", [companymaster_service_1.CompanymasterService])
], CompanymasterController);
//# sourceMappingURL=companymaster.controller.js.map