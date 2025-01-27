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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async findByEmail(email) {
        console.log("emaildata", await this.UserRepository.findOne({ where: { email } }));
        return await this.UserRepository.findOne({ where: { email } });
    }
    async create(createUserDto) {
        console.log(createUserDto);
        const AlreadyExits = await this.UserRepository.findOne({ where: { name: createUserDto.name, email: createUserDto.email } });
        if (AlreadyExits)
            throw new common_1.ConflictException('This user already exists');
        const dobString = new Date(createUserDto.DOB).toISOString().split('T')[0].replace(/-/g, '');
        const hashPassword = await bcrypt.hash(dobString, 10);
        const newUser = this.UserRepository.create({
            name: createUserDto.name,
            password: hashPassword,
            email: createUserDto.email,
            role: 'user',
            DOB: createUserDto.DOB,
            mobile: createUserDto.mobile,
            address: createUserDto.address,
            gender: createUserDto.gender,
            profile: createUserDto.profile,
            createdby: createUserDto.user_id,
            des_id: createUserDto.des_id,
            cm_id: createUserDto.cm_id,
            isActive: true
        });
        return this.UserRepository.save(newUser);
    }
    async findAll() {
        return this.UserRepository.find({
            select: ['user_id', 'name', 'email', 'DOB', 'mobile', 'profile', 'isActive'],
            relations: ['designation', 'company'],
            order: { isActive: 'DESC', user_id: 'DESC' },
        }).then(users => users.map(user => {
            const dob = new Date(user.DOB);
            const currentYear = new Date().getFullYear();
            const age = currentYear - dob.getFullYear();
            const formattedDOB = dob.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
            return {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                DOB: formattedDOB,
                profile: user.profile ? user.profile : user.name,
                currentYear,
                age,
                mobile: user.mobile,
                designationName: user.designation?.DesginationName || null,
                companyName: user.company?.CompanyName || null,
                isactive: user.isActive
            };
        }));
    }
    async findOne(user_id) {
        return this.UserRepository.find({
            select: ['user_id', 'name', 'email', 'DOB', 'mobile', 'profile', 'gender', 'mobile', 'email'],
            relations: ['designation', 'company'],
            where: { user_id }
        }).then(users => users.map(user => {
            const dob = new Date(user.DOB);
            const currentYear = new Date().getFullYear();
            const age = currentYear - dob.getFullYear();
            const formattedDOB = dob.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
            return {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                DOB: formattedDOB,
                dateofbirth: user.DOB,
                profile: user.profile ? user.profile : user.name,
                currentYear,
                age,
                mobile: user.mobile,
                designationName: user.designation?.DesginationName || null,
                companyName: user.company?.CompanyName || null,
            };
        }));
    }
    async update(user_id, updateUserDto) {
        const existingUser = await this.UserRepository.findOne({ where: { user_id } });
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with ID ${user_id} not found`);
        }
        await this.UserRepository.update(user_id, updateUserDto);
        return `User with ID ${user_id} has been updated successfully`;
    }
    async remove(user_id) {
        return await this.UserRepository.delete({ user_id });
    }
    async isActiveuser(user_id, mood) {
        if (mood === 'InActive') {
            return await this.UserRepository.update({ user_id }, { isActive: false });
        }
        else {
            return await this.UserRepository.update({ user_id }, { isActive: true });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map