"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const dashboard_controller_1 = require("./dashboard.controller");
const typeorm_1 = require("@nestjs/typeorm");
const client_vist_entity_1 = require("../client_vist/entities/client_vist.entity");
const dashboard_service_1 = require("./dashboard.service");
const client_entity_1 = require("../client/entities/client.entity");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_vist_entity_1.ClientVist, client_entity_1.Client])],
        providers: [dashboard_service_1.DashboardService],
        controllers: [dashboard_controller_1.DashboardController]
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map