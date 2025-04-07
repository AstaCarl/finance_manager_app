import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from './src/users/entities/user';
import { Category } from './src/categories/entities/category.entity';
import { Entry } from './src/entries/entities/entry.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
       host: process.env.DB_HOST,
       port: +(process.env.DB_PORT || 5432),
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       autoLoadEntities: true,
       synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
       entities: [UserEntity, Category, Entry],
       migrations: ['dist/src/migrations/*{.ts,.js}'],
}

const datasource = new DataSource(dbConfig as DataSourceOptions);
export default datasource;