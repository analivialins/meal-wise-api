import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenusEntity } from './menus.entity';

@Injectable()
export class MenusRepository {
  constructor(
    @InjectRepository(MenusEntity)
    private repository: Repository<MenusEntity>,
  ) {}

  async create(menu: Partial<MenusEntity>): Promise<MenusEntity> {
    const menuEntity = this.repository.create(menu);
    return this.repository.save(menuEntity);
  }

  async update(id: string, updateData: Partial<MenusEntity>): Promise<MenusEntity> {
    await this.repository.update(id, updateData);
    const updatedMenu = await this.repository.findOne({ where: { id } });
    
    if (!updatedMenu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    
    return updatedMenu;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }

  async getAllMenus(userId: string): Promise<MenusEntity | null> {
    const menu = await this.repository.findOne({
      where: { user: userId },
    });
  
    if (!menu) {
      throw new Error('Menu not found');
    }
  
    return menu;
  }
}
