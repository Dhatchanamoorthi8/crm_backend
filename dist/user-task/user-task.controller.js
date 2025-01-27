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
exports.UserTaskController = void 0;
const common_1 = require("@nestjs/common");
const user_task_service_1 = require("./user-task.service");
let UserTaskController = class UserTaskController {
    constructor(userTaskService) {
        this.userTaskService = userTaskService;
    }
    create(createUserTaskDto) {
        console.log(createUserTaskDto.user_id, createUserTaskDto.tasks);
        return this.userTaskService.create(createUserTaskDto);
    }
    findAll() {
        return this.userTaskService.findAll();
    }
    findOne(id) {
        return this.userTaskService.findOne(+id);
    }
    update(id, updateUserTaskDto) {
        return this.userTaskService.update(+id, updateUserTaskDto);
    }
    remove(id) {
        return this.userTaskService.remove(+id);
    }
    adminTaskView(id, mood, fromdate, todate) {
        return this.userTaskService.adminTaskView(+id, mood, fromdate, todate);
    }
};
exports.UserTaskController = UserTaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserTaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserTaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserTaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserTaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserTaskController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('adminTaskView/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('mood')),
    __param(2, (0, common_1.Query)('fromdate')),
    __param(3, (0, common_1.Query)('todate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], UserTaskController.prototype, "adminTaskView", null);
exports.UserTaskController = UserTaskController = __decorate([
    (0, common_1.Controller)('user-task'),
    __metadata("design:paramtypes", [user_task_service_1.UserTaskService])
], UserTaskController);
//# sourceMappingURL=user-task.controller.js.map