import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    upgrade(userId: number): Promise<import("../users/entities/user").UserEntity>;
    signup(user: any): Promise<{
        username: string;
        password: string;
    } & import("../users/entities/user").UserEntity>;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
