import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusEntity } from '../../database/menus/menus.entity';
import { MenusRepository } from '../../database/menus/menus.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenusEntity])],
  controllers: [MenuController],
  providers: [MenuService,MenusRepository],
})
export class MenuModule {}
