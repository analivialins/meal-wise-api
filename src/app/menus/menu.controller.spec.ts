import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/menu.dto';
import { MenusEntity } from '../../database/menus/menus.entity';

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
            deleteMenu: jest.fn(),
            getAllMenus: jest.fn(),
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
        type: 1,
        recipe: 'recipe-id',
      };

      const result: MenusEntity = {
        id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        user: 'user-id',
        ...menuDto,
      };

      jest.spyOn(menuService, 'createMenu').mockResolvedValue(result);

      expect(await menuController.createMenu(menuDto, { user: { id: 'user-id' } })).toBe(result);
    });
  });

  describe('updateMenu', () => {
    it('should update an existing menu', async () => {
      const id = '1';
      const menuDto: MenuDto = {
        type: 2,
        recipe: 'updated-recipe-id',
      };

      const result: MenusEntity = {
        id,
        created_at: new Date(),
        updated_at: new Date(),
        user: 'user-id',
        ...menuDto,
      };

      jest.spyOn(menuService, 'updateMenu').mockResolvedValue(result);

      expect(await menuController.updateMenu(id, menuDto)).toBe(result);
    });
  });

  describe('deleteMenu', () => {
    it('should delete a menu', async () => {
      const id = '1';

      jest.spyOn(menuService, 'deleteMenu').mockResolvedValue();

      expect(await menuController.deleteMenu(id)).toEqual({ message: 'Menu deleted successfully' });
    });
  });

  describe('getAllMenus', () => {
    it('should return an array of menus', async () => {
      const result: MenusEntity[] = [
        {
          id: '1',
          created_at: new Date(),
          updated_at: new Date(),
          user: 'user-id',
          type: 1,
          recipe: 'recipe-id',
        },
      ];

      jest.spyOn(menuService, 'getAllMenus').mockResolvedValue(result);

      expect(await menuController.getAllMenus({ user: { id: 'user-id' } })).toBe(result);
    });
  });
});
