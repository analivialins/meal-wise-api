import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { MenusEntity } from '../../database/menus/menus.entity';
import { MenusRepository } from '../../database/menus/menus.repository';
import { RecipeService } from '../recipes/recipe.service';
import { RecipeDto } from '../recipes/dto/recipe.dto';

@Injectable()
export class MenuService {
  constructor(
    private readonly menusRepository: MenusRepository,
    private readonly recipesService: RecipeService,
  ) {}

  async createMenu(menuDto: MenuDto, userId: string): Promise<MenusEntity> {
    const menuEntity: Partial<MenusEntity> = {
      meals: {
        sunday: menuDto.sunday,
        monday: menuDto.monday,
        tuesday: menuDto.tuesday,
        wednesday: menuDto.wednesday,
        thursday: menuDto.thursday,
        friday: menuDto.friday,
        saturday: menuDto.saturday,
      },
      user: userId,
    };

    return this.menusRepository.create(menuEntity as MenusEntity);
  }

  async updateMenu(id: string, menuDto: MenuDto, userId: string): Promise<MenusEntity | undefined> {
    const menuEntity: Partial<MenusEntity> = {
      meals: {
        sunday: menuDto.sunday,
        monday: menuDto.monday,
        tuesday: menuDto.tuesday,
        wednesday: menuDto.wednesday,
        thursday: menuDto.thursday,
        friday: menuDto.friday,
        saturday: menuDto.saturday,
      },
      user: userId,
    };

    return this.menusRepository.update(id, menuEntity as MenusEntity);
  }

  async deleteMenu(id: string, userId: string): Promise<void> {
    await this.menusRepository.delete(id);
  }

  async getAllMenus(userId: string): Promise<MenusEntity> {
    const menu = await this.menusRepository.getAllMenus(userId);
    const updatedMenu = { ...menu };

    for (const day in updatedMenu.meals) {
        if (updatedMenu.meals.hasOwnProperty(day)) {
            const meals = updatedMenu.meals[day];
            for (const meal of meals) {
                const recipeEntity = await this.recipesService.getRecipeById(meal.recipe);
                if (recipeEntity) {
                    const recipeDto: RecipeDto = {
                        name: recipeEntity.name,
                        cover: recipeEntity.cover,
                        totalCalories: recipeEntity.totalCalories,
                        ingredients: recipeEntity.ingredients,
                        prepares: recipeEntity.prepares,
                    };
                    meal.recipe = recipeDto;
                }
            }
        }
    }

    return updatedMenu;
}


}
