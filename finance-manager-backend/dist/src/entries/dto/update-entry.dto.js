"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_entry_dto_1 = require("./create-entry.dto");
class UpdateEntryDto extends (0, mapped_types_1.PartialType)(create_entry_dto_1.CreateEntryDto) {
}
exports.UpdateEntryDto = UpdateEntryDto;
//# sourceMappingURL=update-entry.dto.js.map