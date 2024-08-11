import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { MenuEntity } from '../../database/menus/menu.entity';
import { MenusRepository } from '../../database/menus/menus.repository';

@Injectable()
export class MenuService {
  constructor(private readonly menusRepository: MenusRepository) {}

  async createMenu(menuDto: MenuDto): Promise<MenuEntity> {
    const menuEntity = this.menusRepository.create(menuDto);
    return menuEntity;
  }

  async updateMenu(id: string, menuDto: MenuDto): Promise<MenuEntity | undefined> {
    return this.menusRepository.update(id, menuDto);
  }

  async getAllMenus(): Promise<MenuEntity[]> {
    return this.menusRepository.getAllMenus();
  }

  async getMenuById(id: string): Promise<MenuEntity | undefined> {
    return this.menusRepository.getMenuById(id);
  }
}

export default MenuService;
