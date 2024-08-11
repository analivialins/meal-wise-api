import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from './menu.entity';

@Injectable()
export class MenusRepository {
  constructor(
    @InjectRepository(MenuEntity)
    private repository: Repository<MenuEntity>,
  ) {}

  async create(menu: Partial<MenuEntity>): Promise<MenuEntity> {
    const menuEntity = this.repository.create(menu);
    return this.repository.save(menuEntity);
  }

  async update(id: string, updateData: Partial<MenuEntity>): Promise<MenuEntity | undefined> {
    await this.repository.update(id, updateData);
    return this.repository.findOne({
      where: { id: id },
    });
  }

  async getMenuById(id: string): Promise<MenuEntity | undefined> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  async getAllMenus(userId: string): Promise<MenuEntity[]> {
    return this.repository.find({
      where: { user: userId },
    });
  }
}
