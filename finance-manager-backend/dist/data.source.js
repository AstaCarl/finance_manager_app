"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./src/users/entities/user");
const category_entity_1 = require("./src/categories/entities/category.entity");
const entry_entity_1 = require("./src/entries/entities/entry.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.dbConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    entities: [user_1.UserEntity, category_entity_1.Category, entry_entity_1.Entry],
    migrations: ['dist/src/migrations/*{.ts,.js}'],
};
const datasource = new typeorm_1.DataSource(exports.dbConfig);
exports.default = datasource;
//# sourceMappingURL=data.source.js.map