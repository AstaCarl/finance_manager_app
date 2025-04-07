import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JwtAuthGuard } from '../../src/authentication/jwt-auth.guard';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  // Creates a new entry, requires a user to be logged in
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createEntryDto: CreateEntryDto) {
    const userId = req.user.id
    return this.entriesService.create(createEntryDto, userId);
  }

  // Finds all entries for a specific user, requires a user to be logged in
  @UseGuards(JwtAuthGuard)
  @Get('user')
  findAllByUserId(@Req() req) {
    const userId = req.user.id
    return this.entriesService.findAllByUserId(userId);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.entriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.entriesService.remove(+id);
  }
}
