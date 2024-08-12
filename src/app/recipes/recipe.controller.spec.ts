import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';
import { RecipesEntity } from '../../database/recipes/recipes.entity';

describe('RecipeController', () => {
  let recipeController: RecipeController;
  let recipeService: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: {
            createRecipe: jest.fn(),
            updateRecipe: jest.fn(),
            getAllRecipes: jest.fn(),
            getRecipeById: jest.fn(),
            deleteRecipe: jest.fn(),
          },
        },
      ],
    }).compile();

    recipeController = module.get<RecipeController>(RecipeController);
    recipeService = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeController).toBeDefined();
  });

  describe('createRecipe', () => {
    it('should create a new recipe', async () => {
      const recipeDto: RecipeDto = {
        name: 'Test Recipe',
        cover: 1,
        totalCalories: 500,
        ingredients: [
          { quantity: 1, unity: 1, description: 'Ingredient 1' },
          { quantity: 2, unity: 2, description: 'Ingredient 2' },
        ],
        prepares: ['Step 1', 'Step 2'],
      };

      const result: RecipesEntity = {
        id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        user: 'user-id',
        ...recipeDto,
      };

      jest.spyOn(recipeService, 'createRecipe').mockResolvedValue(result);

      expect(await recipeController.createRecipe(recipeDto, { user: { id: 'user-id' } })).toBe(result);
    });
  });

  describe('updateRecipe', () => {
    it('should update an existing recipe', async () => {
      const id = '1';
      const recipeDto: RecipeDto = {
        name: 'Updated Recipe',
        cover: 1,
        totalCalories: 600,
        ingredients: [
          { quantity: 3, unity: 3, description: 'Ingredient 3' },
        ],
        prepares: ['Step 1'],
      };

      const result: RecipesEntity = {
        id,
        created_at: new Date(),
        updated_at: new Date(),
        user: 'user-id',
        ...recipeDto,
      };

      jest.spyOn(recipeService, 'updateRecipe').mockResolvedValue(result);

      expect(await recipeController.updateRecipe(id, recipeDto)).toBe(result);
    });
  });

  describe('getAllRecipes', () => {
    it('should return an array of recipes', async () => {
      const result: RecipesEntity[] = [
        {
          id: '1',
          created_at: new Date(),
          updated_at: new Date(),
          user: 'user-id',
          name: 'Recipe 1',
          cover: 1,
          totalCalories: 500,
          ingredients: [
            { quantity: 1, unity: 1, description: 'Ingredient 1' },
          ],
          prepares: ['Step 1'],
        },
      ];

      jest.spyOn(recipeService, 'getAllRecipes').mockResolvedValue(result);

      expect(await recipeController.getAllRecipes({ user: { id: 'user-id' } })).toBe(result);
    });
  });

  describe('getRecipeById', () => {
    it('should return a single recipe by id', async () => {
      const id = '1';
      const result: RecipesEntity = {
        id,
        created_at: new Date(),
        updated_at: new Date(),
        user: 'user-id',
        name: 'Recipe 1',
        cover: 1,
        totalCalories: 500,
        ingredients: [
          { quantity: 1, unity: 1, description: 'Ingredient 1' },
        ],
        prepares: ['Step 1'],
      };

      jest.spyOn(recipeService, 'getRecipeById').mockResolvedValue(result);

      expect(await recipeController.getRecipeById(id)).toBe(result);
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe by id', async () => {
      const id = '1';

      jest.spyOn(recipeService, 'deleteRecipe').mockResolvedValue();

      expect(await recipeController.deleteRecipe(id)).toEqual({ message: 'Recipe deleted successfully' });
    });
  });
});
