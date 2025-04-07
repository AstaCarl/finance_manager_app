import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';
export declare class EntriesService {
    private entryRepository;
    constructor(entryRepository: Repository<Entry>);
    create(createEntryDto: CreateEntryDto, userId: number): Promise<Entry>;
    findAllByUserId(userId: number): Promise<Entry[]>;
    findAll(): Promise<Entry[]>;
    findOne(id: number): void;
    update(id: number, updateEntryDto: UpdateEntryDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
