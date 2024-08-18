import { Controller, Post, Body, Put, Param, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InformationsDto } from './dto/informations.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ id: string }> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/informations')
  async updateUserInformation(
    @Body() informationsDto: InformationsDto,
    @Req() req: any
  ): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    await this.userService.updateUserInformations(userId, informationsDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateUserDto>
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateData);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }
}
