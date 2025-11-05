export class ReviewDto {
  id: number;
  rating: number;
  comment?: string | null;
  foodId: number;
  createdAt: Date;
  updatedAt: Date;
}
