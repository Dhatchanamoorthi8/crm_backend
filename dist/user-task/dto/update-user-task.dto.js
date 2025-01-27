"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_task_dto_1 = require("./create-user-task.dto");
class UpdateUserTaskDto extends (0, swagger_1.PartialType)(create_user_task_dto_1.CreateUserTaskDto) {
}
exports.UpdateUserTaskDto = UpdateUserTaskDto;
//# sourceMappingURL=update-user-task.dto.js.map