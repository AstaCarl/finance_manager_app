import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../../src/authentication/jwt-auth.guard';
import { UsersService } from '../../src/users/users.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createCategoryDto: CreateCategoryDto) {
    console.log("req user in controller", req.user);
    if (!req.user) {
      console.log("User not found in request");
      throw new UnauthorizedException();
    }
  
    const userId = req.user.id
    return this.categoriesService.create(createCategoryDto, userId);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  findAllByUser(@Req() req) {
    const userId = req.user.id;
    return this.categoriesService.findAllByUser(userId);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
