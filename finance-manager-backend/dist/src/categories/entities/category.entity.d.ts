import { Entry } from '../../../src/entries/entities/entry.entity';
import { UserEntity } from '../../../src/users/entities/user';
export declare class Category {
    id: number;
    title: string;
    entries: Entry[];
    user: UserEntity;
}
