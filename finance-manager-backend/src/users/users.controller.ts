import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@Req() req, @Body() createEntryDto: CreateEntryDto) {
  //   const userId = req.user.id
  //   return this.entriesService.create(createEntryDto, userId);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Get(':id')
  findOneById(@Param('id') userId: number) {
    return this.usersService.findOneById(userId);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(+id);
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
  //   return this.entriesService.update(+id, updateEntryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
