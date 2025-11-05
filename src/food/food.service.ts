import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  FoodModel,
  FoodUncheckedCreateInput,
  FoodUncheckedUpdateInput,
} from '../../generated/prisma/models/Food';
import { PrismaService } from '../database/prisma.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodDto } from './dto/food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFoodDto: CreateFoodDto): Promise<FoodModel> {
    // validate category exists to avoid FK constraint errors
    if (createFoodDto.categoryId) {
      const cat = await this.prisma.category.findUnique({
        where: { id: createFoodDto.categoryId },
      });
      if (!cat) throw new NotFoundException('Category not found');
    }
    const data: FoodUncheckedCreateInput = {
      name: createFoodDto.name,
      description: createFoodDto.description ?? null,
      price: createFoodDto.price,
      categoryId: createFoodDto.categoryId,
      createdAt: createFoodDto.createdAt,
      updatedAt: createFoodDto.updatedAt ?? new Date(),
    };

    return this.prisma.food.create({ data });
  }

  async findAll(): Promise<FoodDto[]> {
    return this.prisma.food.findMany({
      include: { Category: true },
    });
  }

  async findOne(id: number): Promise<FoodDto | null> {
    return this.prisma.food.findUnique({
      where: { id },
      include: { Category: true },
    });
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<FoodModel> {
    const data: FoodUncheckedUpdateInput = {} as FoodUncheckedUpdateInput;
    if (updateFoodDto.name !== undefined) data.name = updateFoodDto.name;
    if (updateFoodDto.description !== undefined)
      data.description = updateFoodDto.description ?? null;
    if (updateFoodDto.price !== undefined) data.price = updateFoodDto.price;
    if (updateFoodDto.categoryId !== undefined) {
      const cat = await this.prisma.category.findUnique({
        where: { id: updateFoodDto.categoryId },
      });
      if (!cat) throw new NotFoundException('Category not found');
      data.categoryId = updateFoodDto.categoryId;
    }
    if (updateFoodDto.createdAt !== undefined)
      data.createdAt = updateFoodDto.createdAt;
    data.updatedAt = updateFoodDto.updatedAt ?? new Date();

    return this.prisma.food.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<FoodModel> {
    return this.prisma.food.delete({ where: { id } });
  }
}
