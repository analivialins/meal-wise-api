import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { MenusEntity } from '../../database/menus/menus.entity';
import { MenusRepository } from '../../database/menus/menus.repository';

@Injectable()
export class MenuService {
  constructor(private readonly menusRepository: MenusRepository) {}

  async createMenu(menuDto: MenuDto, userId: string): Promise<MenusEntity> {
    const menuEntity = { ...menuDto, user: userId };
    return this.menusRepository.create(menuEntity);
  }

  async updateMenu(id: string, menuDto: MenuDto): Promise<MenusEntity | undefined> {
    return this.menusRepository.update(id, menuDto);
  }

  async deleteMenu(id: string): Promise<void> {
    await this.menusRepository.delete(id);
  }

  async getAllMenus(userId: string): Promise<MenusEntity[]> {
    return this.menusRepository.getAllMenus(userId);
  }
}

export default MenuService;
