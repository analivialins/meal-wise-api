import { Injectable } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { RecipesEntity } from '../../database/recipes/recipes.entity';
import { RecipesRepository } from '../../database/recipes/recipes.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async createRecipe(recipeDto: RecipeDto, userId: string): Promise<RecipesEntity> {
    const recipeEntity = { ...recipeDto, user: userId };
    return this.recipesRepository.create(recipeEntity);
  }

  async updateRecipe(id: string, recipeDto: RecipeDto): Promise<RecipesEntity | undefined> {
    return this.recipesRepository.update(id, recipeDto);
  }

  async deleteRecipe(id: string): Promise<void> {
    await this.recipesRepository.delete(id);
  }

  async getAllRecipes(userId: string): Promise<RecipesEntity[]> {
    return this.recipesRepository.getAllRecipes(userId);
  }

  async getRecipeById(id: string): Promise<RecipesEntity | undefined> {
    return this.recipesRepository.getRecipeById(id);
  }

  
}

export default RecipeService;
