import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../../database/menus/menu.entity';
import { MenusRepository } from '../../database/menus/menus.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';


@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService, MenusRepository],
})
export class MenuModule {}
