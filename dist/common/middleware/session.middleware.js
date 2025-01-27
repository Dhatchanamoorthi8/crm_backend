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
exports.SessionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("../../sessions/sessions.service");
const jwt = require("jsonwebtoken");
let SessionMiddleware = class SessionMiddleware {
    constructor(sessionsService) {
        this.sessionsService = sessionsService;
    }
    async use(req, res, next) {
        const token = req.get('authorization')?.split(' ')[1];
        const deviceId = req.get('device-id');
        if (!token || !deviceId) {
            return next();
        }
        try {
            const decoded = jwt.decode(token);
            if (decoded && decoded.exp) {
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTime) {
                    throw new common_1.UnauthorizedException('JWT token has expired');
                }
            }
            else {
                throw new common_1.UnauthorizedException('Invalid JWT token');
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired JWT token');
        }
        const session = await this.sessionsService.findSessionByTokenAndDevice(token, deviceId);
        if (!session) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
        if (new Date() > session.expiresAt) {
            throw new common_1.UnauthorizedException('Session has expired. Please log in again');
        }
        next();
    }
};
exports.SessionMiddleware = SessionMiddleware;
exports.SessionMiddleware = SessionMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService])
], SessionMiddleware);
//# sourceMappingURL=session.middleware.js.map