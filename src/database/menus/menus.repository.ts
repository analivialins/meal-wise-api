import { Injectable } from '@nestjs/common';
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

  async update(id: string, updateData: Partial<MenusEntity>): Promise<MenusEntity | undefined> {
    await this.repository.update(id, updateData);
    return this.repository.findOne({
      where: { id: id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getAllMenus(userId: string): Promise<MenusEntity[]> {
    return this.repository.find({
      where: { user: userId },
    });
  }
}
