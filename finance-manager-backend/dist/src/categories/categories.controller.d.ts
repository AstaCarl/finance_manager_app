import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UsersService } from '../../src/users/users.service';
export declare class CategoriesController {
    private readonly categoriesService;
    private readonly usersService;
    constructor(categoriesService: CategoriesService, usersService: UsersService);
    create(req: any, createCategoryDto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findAllByUser(req: any): Promise<import("./entities/category.entity").Category[]>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
