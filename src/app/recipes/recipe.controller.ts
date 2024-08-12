import { Controller, Post, Body, Req, Put, Param, Get, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async createRecipe(@Body() recipeDto: RecipeDto, @Req() req: any) {
    const userId = req.user.id;
    return this.recipeService.createRecipe(recipeDto, userId);
  }

  @Put(':id')
  async updateRecipe(@Param('id') id: string, @Body() recipeDto: RecipeDto) {
    return this.recipeService.updateRecipe(id, recipeDto);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string) {
    await this.recipeService.deleteRecipe(id);
    return { message: 'Recipe deleted successfully' };
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string) {
    return this.recipeService.getRecipeById(id);
  }

  @Get()
  async getAllRecipes(@Req() req: any) {
    const userId = req.user.id;
    return this.recipeService.getAllRecipes(userId);
  }
}
