export class CreateReviewDto {
  rating!: number;
  comment?: string | null;
  foodId!: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
