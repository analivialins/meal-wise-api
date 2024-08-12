import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipesEntity } from './recipes.entity';

@Injectable()
export class RecipesRepository {
  constructor(
    @InjectRepository(RecipesEntity)
    private repository: Repository<RecipesEntity>,
  ) {}

  async create(recipe: Partial<RecipesEntity>): Promise<RecipesEntity> {
    const recipesEntity = this.repository.create(recipe);
    return this.repository.save(recipesEntity);
  }

  async update(id: string, updateData: Partial<RecipesEntity>): Promise<RecipesEntity | undefined> {
    await this.repository.update(id, updateData);
    return this.repository.findOne({
      where: { id: id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getRecipeById(id: string): Promise<RecipesEntity | undefined> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  async getAllRecipes(userId: string): Promise<RecipesEntity[]> {
    return this.repository.find({
      where: { user: userId },
    });
  }
}
