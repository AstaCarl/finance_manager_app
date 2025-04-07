import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from './../users/users.service';
export declare class TenantGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
