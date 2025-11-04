import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        updatedAt: new Date(),
      },
    });
  }

  async findAll(): Promise<CategoryDto[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<CategoryDto | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number): Promise<CategoryDto> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
