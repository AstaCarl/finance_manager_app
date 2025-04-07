import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category>;
    findAll(): Promise<Category[]>;
    findAllByUser(userId: number): Promise<Category[]>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
