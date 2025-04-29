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
const user_1 = require("./entities/user");
const typeorm_2 = require("typeorm");
const Role_1 = require("./Role");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async upgrade(userId) {
        const user = await this.findUserById(userId);
        user.role = Role_1.Role.PremiumUser;
        return this.userRepository.save(user);
    }
    async findUserById(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    async findOne(username) {
        const result = await this.userRepository.findOne({
            where: { username: username },
        });
        console.log("findOne user service result:", result);
        return result || null;
    }
    async findOneById(userId) {
        const result = await this.userRepository.findOne({ where: { id: userId } });
        if (!result) {
            throw new Error(`User with username ${userId} not found`);
        }
        return result;
    }
    async findById(id) {
        const result = await this.userRepository.findOne({
            where: { id: id },
            relations: ['category', 'entries'],
        });
        if (!result) {
            throw new Error(`User with username ${id} not found`);
        }
        return result;
    }
    async create(username, password) {
        return this.userRepository.save({ username, password });
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return this.userRepository.remove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map