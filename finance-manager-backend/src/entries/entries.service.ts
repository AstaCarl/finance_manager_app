import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) {}

  // Create a new entry, adds the user id to the entry
  async create(createEntryDto: CreateEntryDto, userId: number) {
    const entry = this.entryRepository.create({ ...createEntryDto, user: { id: userId } });
    return this.entryRepository.save(entry)
  }

  // Find all entries by user id sent in the token
  async findAllByUserId(userId: number) {
    return this.entryRepository.find({ where: { user: { id: userId } } });
  }

  async findAll() {
    return this.entryRepository.find({ relations: ['category'] });
  }

  findOne(id: number) {
    // return this.entryRepository.find(id);
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: number) {
    return this.entryRepository.delete(id);
  }
}
