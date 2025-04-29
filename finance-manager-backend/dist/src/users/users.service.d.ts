import { UserEntity } from './entities/user';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    upgrade(userId: number): Promise<UserEntity>;
    findUserById(id: number): Promise<UserEntity>;
    findOne(username: string): Promise<UserEntity | null>;
    findOneById(userId: number): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    create(username: string, password: string): Promise<{
        username: string;
        password: string;
    } & UserEntity>;
    remove(id: number): Promise<UserEntity>;
}
