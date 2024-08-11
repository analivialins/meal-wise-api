import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/menu.dto';
import { MenuEntity } from '../../database/menus/menu.entity';


describe('MenuController', () => {
  let menuController: MenuController;
  let menuService: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [
        {
          provide: MenuService,
          useValue: {
            createMenu: jest.fn(),
            updateMenu: jest.fn(),
            getAllMenus: jest.fn(),
            getMenuById: jest.fn(),
          },
        },
      ],
    }).compile();

    menuController = module.get<MenuController>(MenuController);
    menuService = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(menuController).toBeDefined();
  });

  describe('createMenu', () => {
    it('should create a new menu', async () => {
      const menuDto: MenuDto = {
        name: 'Test Menu',
        type: 1,
        totalCalories: 500,
        ingredients: [
          { quantity: 1, unity: 1, description: 'Ingredient 1' },
          { quantity: 2, unity: 2, description: 'Ingredient 2' },
        ],
        prepares: ['Step 1', 'Step 2'],
      };

      const result: MenuEntity = {
        id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        ...menuDto,
      };

      jest.spyOn(menuService, 'createMenu').mockResolvedValue(result);

      expect(await menuController.createMenu(menuDto)).toBe(result);
    });
  });

  describe('updateMenu', () => {
    it('should update an existing menu', async () => {
      const id = '1';
      const menuDto: MenuDto = {
        name: 'Updated Menu',
        type: 2,
        totalCalories: 600,
        ingredients: [
          { quantity: 3, unity: 3, description: 'Ingredient 3' },
        ],
        prepares: ['Step 1'],
      };

      const result: MenuEntity = {
        id,
        created_at: new Date(),
        updated_at: new Date(),
        ...menuDto,
      };

      jest.spyOn(menuService, 'updateMenu').mockResolvedValue(result);

      expect(await menuController.updateMenu(id, menuDto)).toBe(result);
    });
  });

  describe('getAllMenus', () => {
    it('should return an array of menus', async () => {
      const result: MenuEntity[] = [
        {
          id: '1',
          created_at: new Date(),
          updated_at: new Date(),
          name: 'Menu 1',
          type: 1,
          totalCalories: 500,
          ingredients: [
            { quantity: 1, unity: 1, description: 'Ingredient 1' },
          ],
          prepares: ['Step 1'],
        },
      ];

      jest.spyOn(menuService, 'getAllMenus').mockResolvedValue(result);

      expect(await menuController.getAllMenus()).toBe(result);
    });
  });

  describe('getMenuById', () => {
    it('should return a single menu by id', async () => {
      const id = '1';
      const result: MenuEntity = {
        id,
        created_at: new Date(),
        updated_at: new Date(),
        name: 'Menu 1',
        type: 1,
        totalCalories: 500,
        ingredients: [
          { quantity: 1, unity: 1, description: 'Ingredient 1' },
        ],
        prepares: ['Step 1'],
      };

      jest.spyOn(menuService, 'getMenuById').mockResolvedValue(result);

      expect(await menuController.getMenuById(id)).toBe(result);
    });
  });
});
