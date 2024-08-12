import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesEntity } from './recipes.entity';
import { RecipesRepository } from './recipes.repository';
import { HashModule } from '../../libs/hash/hash.module';

@Module({
	imports: [TypeOrmModule.forFeature([RecipesEntity]),HashModule],
	providers: [RecipesRepository],
	exports: [RecipesRepository]
})

export class RecipesDatabaseModule { }