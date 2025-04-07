import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user';
import { Repository } from 'typeorm';
import { Role } from './Role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async upgrade(userId: number) {
    const user = await this.findUserById(userId); // Finding the user by the userId
    user.role = Role.PremiumUser; // Changing the role in memory. 
    
    return this.userRepository.save(user); // Saving the updated user obj. into database
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async findOne(username: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({
      where: { username: username },
    });
    // console.log("findOne user service", result);

    if (!result) {
      throw new Error(`User with username ${username} not found`);
    }
    return result;
  }

  async findOneById(userId: number): Promise<UserEntity> {
    const result = await this.userRepository.findOne({ where: { id: userId } });
    // console.log("findOne user service", result);

    if (!result) {
      throw new Error(`User with username ${userId} not found`);
    }
    return result;
  }

  async findById(id: number): Promise<UserEntity> {
    const result = await this.userRepository.findOne({
      where: { id: id },
      relations: ['category', 'entries'],
    });
    // console.log("findOne user service", result);

    if (!result) {
      throw new Error(`User with username ${id} not found`);
    }
    return result;
  }

  async create(username: string, password: string) {
    return this.userRepository.save({ username, password }); // Never save passwords in clear text!
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.userRepository.remove(user); // This will remove the user from the database
  }


  // An example to retrieve data with related data. Can be used for
  // finding one tenant or one board member.
  // const result = await this.tenantRepository.findOne({ where:
  //     {
  //         id: savedTenant.id
  //     }, relations: {
  //         user: true
  //     }
  // }
  // );
  // console.log("result", result);
  // return result;
  // await this.userRepository.save({username, password}); // Never save passwords in clear text!
}
