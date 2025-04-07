import { Role } from '../../users/Role';
import { Entry } from '../../entries/entities/entry.entity';
import { Category } from '../../categories/entities/category.entity';
export declare class UserEntity {
    id: number;
    username: string;
    password: string;
    role: Role;
    categories: Category[];
    entries: Entry[];
}
