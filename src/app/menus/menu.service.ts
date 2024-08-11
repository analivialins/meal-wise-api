import { ExecutionContext, Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { MenuEntity } from '../../database/menus/menu.entity';
import { MenusRepository } from '../../database/menus/menus.repository';
@Injectable()
export class MenuService {
  constructor(private readonly menusRepository: MenusRepository) {}

  async createMenu(menuDto: MenuDto, userId: string): Promise<MenuEntity> {
    const menuEntity = { ...menuDto, user: userId };
    return this.menusRepository.create(menuEntity);
  }

  async updateMenu(id: string, menuDto: MenuDto): Promise<MenuEntity | undefined> {
    return this.menusRepository.update(id, menuDto);
  }

  async getAllMenus(userId: string): Promise<MenuEntity[]> {
    return this.menusRepository.getAllMenus(userId);
  }

  async getMenuById(id: string): Promise<MenuEntity | undefined> {
    return this.menusRepository.getMenuById(id);
  }
}




export default MenuService;
