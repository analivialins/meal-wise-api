import { Controller, Post, Body, Req, Put, Param, Get, Delete } from '@nestjs/common';
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

    @Delete(':id')
    async deleteMenu(@Param('id') id: string) {
        await this.menuService.deleteMenu(id);
        return { message: 'Menu deleted successfully' };
    }

    @Get()
    async getAllMenus(@Req() req: any) {
        const userId = req.user.id;
        return this.menuService.getAllMenus(userId);
    }
}
