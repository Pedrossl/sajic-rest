import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [FoodModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
