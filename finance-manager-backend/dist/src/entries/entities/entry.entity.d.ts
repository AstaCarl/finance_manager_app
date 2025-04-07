import { UserEntity } from '../../../src/users/entities/user';
import { Category } from '../../../src/categories/entities/category.entity';
export declare class Entry {
    id: number;
    description: string;
    amount: number;
    date: Date;
    category: Category;
    user: UserEntity;
}
