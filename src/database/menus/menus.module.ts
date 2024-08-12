import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusEntity } from './menus.entity';
import { MenusRepository } from './menus.repository';
import { HashModule } from '../../libs/hash/hash.module';

@Module({
	imports: [TypeOrmModule.forFeature([MenusEntity]),HashModule],
	providers: [MenusRepository],
	exports: [MenusRepository]
})

export class MenusDatabaseModule { }