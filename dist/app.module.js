"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const attendance_module_1 = require("./attendance/attendance.module");
const client_module_1 = require("./client/client.module");
const client_vist_module_1 = require("./client_vist/client_vist.module");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_entity_1 = require("./attendance/entities/attendance.entity");
const client_entity_1 = require("./client/entities/client.entity");
const client_vist_entity_1 = require("./client_vist/entities/client_vist.entity");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const services_offer_module_1 = require("./services_offer/services_offer.module");
const services_offer_entity_1 = require("./services_offer/entities/services_offer.entity");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const config_1 = require("@nestjs/config");
const userdesgination_module_1 = require("./userdesgination/userdesgination.module");
const notification_module_1 = require("./notification/notification.module");
const notification_entity_1 = require("./notification/entities/notification.entity");
const userdesgination_entity_1 = require("./userdesgination/entities/userdesgination.entity");
const companymaster_module_1 = require("./companymaster/companymaster.module");
const companymaster_entity_1 = require("./companymaster/entities/companymaster.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'sql.freedb.tech',
                port: 3306,
                username: 'freedb_free-crm',
                password: 'e6hnDx?S?jq6wgS',
                database: 'freedb_DevVingroCrm',
                entities: [user_entity_1.User, attendance_entity_1.Attendance, client_entity_1.Client, client_vist_entity_1.ClientVist, services_offer_entity_1.ServicesOffer, notification_entity_1.Notification, userdesgination_entity_1.Userdesgination, companymaster_entity_1.Companymaster],
                synchronize: true,
                autoLoadEntities: true,
                extra: {
                    trustServerCertificate: true,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, attendance_entity_1.Attendance, client_entity_1.Client, client_vist_entity_1.ClientVist, services_offer_entity_1.ServicesOffer, notification_entity_1.Notification, userdesgination_entity_1.Userdesgination, companymaster_entity_1.Companymaster]),
            client_module_1.ClientModule,
            client_vist_module_1.ClientVistModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            services_offer_module_1.ServicesOfferModule,
            dashboard_module_1.DashboardModule,
            attendance_module_1.AttendanceModule,
            userdesgination_module_1.UserdesginationModule,
            notification_module_1.NotificationModule,
            companymaster_module_1.CompanymasterModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
