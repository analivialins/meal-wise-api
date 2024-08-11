import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InformationsDto } from './dto/informations.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ id: string }> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/informations/:id')
  async updateUserInformation(
    @Param('id') id: string,
    @Body() informationsDto: InformationsDto
  ): Promise<void> {
    await this.userService.updateUserInformations(id, informationsDto);
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
