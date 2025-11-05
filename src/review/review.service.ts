import { Injectable } from '@nestjs/common';
import type {
  ReviewModel,
  ReviewUncheckedCreateInput,
  ReviewUncheckedUpdateInput,
} from '../../generated/prisma/models/Review';
import { PrismaService } from '../database/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewModel> {
    const data: ReviewUncheckedCreateInput = {
      rating: createReviewDto.rating,
      comment: createReviewDto.comment ?? null,
      foodId: createReviewDto.foodId,
      createdAt: createReviewDto.createdAt,
      updatedAt: createReviewDto.updatedAt ?? new Date(),
    };

    return this.prisma.review.create({ data });
  }

  async findAll(): Promise<ReviewModel[]> {
    return this.prisma.review.findMany({
      include: {
        Food: {
          include: { Category: true },
        },
      },
    });
  }

  async findOne(id: number): Promise<ReviewModel | null> {
    return this.prisma.review.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewModel> {
    const data: ReviewUncheckedUpdateInput = {} as ReviewUncheckedUpdateInput;
    if (updateReviewDto.rating !== undefined)
      data.rating = updateReviewDto.rating;
    if (updateReviewDto.comment !== undefined)
      data.comment = updateReviewDto.comment ?? null;
    if (updateReviewDto.foodId !== undefined)
      data.foodId = updateReviewDto.foodId;
    if (updateReviewDto.createdAt !== undefined)
      data.createdAt = updateReviewDto.createdAt;
    data.updatedAt = updateReviewDto.updatedAt ?? new Date();

    return this.prisma.review.update({ where: { id }, data });
  }

  async remove(id: number): Promise<ReviewModel> {
    return this.prisma.review.delete({ where: { id } });
  }
}
