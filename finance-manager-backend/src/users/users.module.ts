import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Entry } from '../entries/entities/entry.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, Entry, Category])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}