import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
export declare class EntriesController {
    private readonly entriesService;
    constructor(entriesService: EntriesService);
    create(req: any, createEntryDto: CreateEntryDto): Promise<import("./entities/entry.entity").Entry>;
    findAllByUserId(req: any): Promise<import("./entities/entry.entity").Entry[]>;
    findAll(): Promise<import("./entities/entry.entity").Entry[]>;
    findOne(id: number): void;
    update(id: string, updateEntryDto: UpdateEntryDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
