import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(username: string): Promise<import("./entities/user").UserEntity | null>;
    findOneById(userId: number): Promise<import("./entities/user").UserEntity>;
    findById(id: number): Promise<import("./entities/user").UserEntity>;
    remove(id: number): Promise<import("./entities/user").UserEntity>;
}
