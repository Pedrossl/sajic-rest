export class CreateFoodDto {
  name!: string;
  description?: string | null;
  price!: number;
  categoryId!: number;
  // optional: you can let the service set these automatically
  createdAt?: Date;
  updatedAt?: Date;
}
