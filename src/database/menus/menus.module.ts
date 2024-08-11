import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './menu.entity';
import { MenusRepository } from './menus.repository';
import { HashModule } from '../../libs/hash/hash.module';

@Module({
	imports: [TypeOrmModule.forFeature([MenuEntity]),HashModule],
	providers: [MenusRepository],
	exports: [MenusRepository]
})

export class MenusDatabaseModule { }