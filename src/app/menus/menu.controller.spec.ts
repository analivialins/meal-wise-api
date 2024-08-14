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
        sunday: { type: 0, recipe: 'sunday-recipe-id' },
        monday: { type: 1, recipe: 'monday-recipe-id' },
        tuesday: { type: 1, recipe: 'tuesday-recipe-id' },
        wednesday: { type: 1, recipe: 'wednesday-recipe-id' },
        thursday: { type: 2, recipe: 'thursday-recipe-id' },
        friday: { type: 2, recipe: 'friday-recipe-id' },
        saturday: { type: 0, recipe: 'saturday-recipe-id' },
      };

      const result: MenusEntity = {
        id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        user: 'user-id',
        meals: menuDto,
      };

      jest.spyOn(menuService, 'createMenu').mockResolvedValue(result);

      const req = { user: { id: 'user-id' } } as any;

      expect(await menuController.createMenu(menuDto, req)).toBe(result);
    });
  });

  describe('updateMenu', () => {
    it('should update an existing menu', async () => {
      const id = '1';
      const menuDto: MenuDto = {
        sunday: { type: 0, recipe: 'updated-sunday-recipe-id' },
        monday: { type: 1, recipe: 'updated-monday-recipe-id' },
        tuesday: { type: 1, recipe: 'updated-tuesday-recipe-id' },
        wednesday: { type: 1, recipe: 'updated-wednesday-recipe-id' },
        thursday: { type: 2, recipe: 'updated-thursday-recipe-id' },
        friday: { type: 2, recipe: 'updated-friday-recipe-id' },
        saturday: { type: 0, recipe: 'updated-saturday-recipe-id' },
      };

      const result: MenusEntity = {
        id,
        created_at: new Date(),
        updated_at: new Date(),
        user: 'user-id',
        meals: menuDto,
      };

      jest.spyOn(menuService, 'updateMenu').mockResolvedValue(result);

      const req = { user: { id: 'user-id' } } as any;

      expect(await menuController.updateMenu(id, menuDto, req)).toBe(result);
    });
  });

  describe('deleteMenu', () => {
    it('should delete a menu', async () => {
      const id = '1';

      jest.spyOn(menuService, 'deleteMenu').mockResolvedValue();

      const req = { user: { id: 'user-id' } } as any; 

      expect(await menuController.deleteMenu(id, req)).toEqual({ message: 'Menu deleted successfully' });
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
          meals: {
            sunday: { type: 0, recipe: 'sunday-recipe-id' },
            monday: { type: 1, recipe: 'monday-recipe-id' },
            tuesday: { type: 1, recipe: 'tuesday-recipe-id' },
            wednesday: { type: 1, recipe: 'wednesday-recipe-id' },
            thursday: { type: 2, recipe: 'thursday-recipe-id' },
            friday: { type: 2, recipe: 'friday-recipe-id' },
            saturday: { type: 0, recipe: 'saturday-recipe-id' },
          },
        },
      ];

      jest.spyOn(menuService, 'getAllMenus').mockResolvedValue(result);

      const req = { user: { id: 'user-id' } } as any; 

      expect(await menuController.getAllMenus(req)).toBe(result);
    });
  });
});
