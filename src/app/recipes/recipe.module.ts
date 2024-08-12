import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesEntity } from '../../database/recipes/recipes.entity';
import { RecipesRepository } from '../../database/recipes/recipes.repository';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipesEntity])],
  controllers: [RecipeController],
  providers: [RecipeService, RecipesRepository],
})
export class RecipeModule {}
