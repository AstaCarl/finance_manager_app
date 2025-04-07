import { UserEntity } from "src/users/entities/user";
export declare class CreateEntryDto {
    description: string;
    amount: number;
    date: Date;
    categoryId: number;
    user: UserEntity;
}
