import { Controller, Post, Body, Req, Put, Param, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/menu.dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() menuDto: MenuDto, @Req() req: any) {
    const userId = req.user.id;
    return this.menuService.createMenu(menuDto, userId);
  }

  @Put(':id')
  async updateMenu(@Param('id') id: string, @Body() menuDto: MenuDto) {
    return this.menuService.updateMenu(id, menuDto);
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Get()
  async getAllMenus(@Req() req: any) {
    const userId = req.user.id;
    return this.menuService.getAllMenus(userId);
  }
}
