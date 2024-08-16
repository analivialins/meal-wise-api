import { Controller, Post, Body, Req, Put, Param, Get, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/menu.dto';
import { CustomRequest } from '../../common/interfaces/request.interface';
import { MenusEntity } from '../../database/menus/menus.entity';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() menuDto: MenuDto, @Req() req: CustomRequest): Promise<MenusEntity> {
    const userId = req.user.id;   
    return this.menuService.createMenu(menuDto, userId);
  }

  @Put(':id')
  async updateMenu(@Param('id') id: string, @Body() menuDto: MenuDto, @Req() req: CustomRequest): Promise<MenusEntity> {
    const userId = req.user.id;
    return this.menuService.updateMenu(id, menuDto, userId);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string, @Req() req: CustomRequest): Promise<{ message: string }> {
    const userId = req.user.id;
    await this.menuService.deleteMenu(id, userId);
    return { message: 'Menu deleted successfully' };
  }

  @Get()
  async getAllMenus(@Req() req: CustomRequest): Promise<MenusEntity> {
    const userId = req.user.id;
    return this.menuService.getAllMenus(userId);
  }
}
