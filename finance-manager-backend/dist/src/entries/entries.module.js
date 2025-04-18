"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntriesModule = void 0;
const common_1 = require("@nestjs/common");
const entries_service_1 = require("./entries.service");
const entries_controller_1 = require("./entries.controller");
const entry_entity_1 = require("./entities/entry.entity");
const typeorm_1 = require("@nestjs/typeorm");
let EntriesModule = class EntriesModule {
};
exports.EntriesModule = EntriesModule;
exports.EntriesModule = EntriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entry_entity_1.Entry])],
        controllers: [entries_controller_1.EntriesController],
        providers: [entries_service_1.EntriesService],
    })
], EntriesModule);
//# sourceMappingURL=entries.module.js.map