import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    upgrade(req: any): Promise<import("../users/entities/user").UserEntity>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    signup(req: any): Promise<{
        username: string;
        password: string;
    } & import("../users/entities/user").UserEntity>;
}
