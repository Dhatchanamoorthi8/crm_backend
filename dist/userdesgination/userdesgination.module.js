"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserdesginationModule = void 0;
const common_1 = require("@nestjs/common");
const userdesgination_service_1 = require("./userdesgination.service");
const userdesgination_controller_1 = require("./userdesgination.controller");
const typeorm_1 = require("@nestjs/typeorm");
const userdesgination_entity_1 = require("./entities/userdesgination.entity");
const user_entity_1 = require("../users/entities/user.entity");
let UserdesginationModule = class UserdesginationModule {
};
exports.UserdesginationModule = UserdesginationModule;
exports.UserdesginationModule = UserdesginationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([userdesgination_entity_1.Userdesgination, user_entity_1.User])],
        controllers: [userdesgination_controller_1.UserdesginationController],
        providers: [userdesgination_service_1.UserdesginationService],
    })
], UserdesginationModule);
//# sourceMappingURL=userdesgination.module.js.map