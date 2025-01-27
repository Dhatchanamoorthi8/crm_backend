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
exports.UserTaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_task_entity_1 = require("./entities/user-task.entity");
const typeorm_2 = require("typeorm");
const date_fns_1 = require("date-fns");
let UserTaskService = class UserTaskService {
    constructor(UserTaskRepository) {
        this.UserTaskRepository = UserTaskRepository;
    }
    create(createUserTaskDto) {
        const { user_id, tasks } = createUserTaskDto;
        if (!tasks || tasks.length === 0) {
            throw new Error("No tasks provided.");
        }
        const newTasks = tasks.map((task) => {
            return this.UserTaskRepository.create({
                Taskname: task.Taskname,
                TaskStatus: task.TaskStatus,
                Description: task.Description,
                user_id: user_id,
                taskprofile: task.taskprofile
            });
        });
        return this.UserTaskRepository.save(newTasks);
    }
    findAll() {
        return `This action returns all userTask`;
    }
    async findOne(user_id) {
        const todayStart = (0, date_fns_1.startOfDay)(new Date());
        const todayEnd = (0, date_fns_1.endOfDay)(new Date());
        const response = await this.UserTaskRepository.find({ where: { user_id, createdAt: (0, typeorm_2.Between)(todayStart, todayEnd) } });
        return response;
    }
    update(id, updateUserTaskDto) {
        const updateData = this.UserTaskRepository.update({ taskid: id }, {
            Taskname: updateUserTaskDto.Taskname,
            TaskStatus: updateUserTaskDto.TaskStatus,
            Description: updateUserTaskDto.Description,
        });
        return updateData;
    }
    async remove(taskid) {
        return await this.UserTaskRepository.delete({ taskid });
    }
    async adminTaskView(user_id, mood, fromdate, todate) {
        console.log(user_id, mood, fromdate, todate);
        if (mood === 'today') {
            const todayStart = (0, date_fns_1.startOfDay)(new Date());
            const todayEnd = (0, date_fns_1.endOfDay)(new Date());
            const response = await this.UserTaskRepository.find({ where: { user_id, createdAt: (0, typeorm_2.Between)(todayStart, todayEnd) } });
            return response;
        }
        if (mood === 'yesterday') {
            const yesterdayStart = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(new Date(), 1));
            const yesterdayEnd = (0, date_fns_1.endOfDay)((0, date_fns_1.subDays)(new Date(), 1));
            const response = await this.UserTaskRepository.find({
                where: {
                    user_id,
                    createdAt: (0, typeorm_2.Between)(yesterdayStart, yesterdayEnd)
                },
            });
            return response;
        }
        if (mood === 'custom') {
            const todayStart = (0, date_fns_1.startOfDay)(new Date(fromdate));
            const todayEnd = (0, date_fns_1.endOfDay)(new Date(todate));
            const response = await this.UserTaskRepository.find({ where: { user_id, createdAt: (0, typeorm_2.Between)(todayStart, todayEnd) }, order: { createdAt: 'desc' } });
            return response;
        }
    }
};
exports.UserTaskService = UserTaskService;
exports.UserTaskService = UserTaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_task_entity_1.UserTask)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserTaskService);
//# sourceMappingURL=user-task.service.js.map