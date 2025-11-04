export class FoodDto {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
