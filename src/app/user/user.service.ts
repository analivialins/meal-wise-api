import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from 'src/libs/hash/hash.service';
import { InformationsDto } from './dto/informations.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private hashService: HashService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ id: string }> {
    const hashedPassword = await this.hashService.hashPassword(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    return { id: savedUser.id };
  }

  async updateUserInformations(id: string, informationsDto: InformationsDto): Promise<void> {
    await this.userRepository.update(id, { informations: informationsDto });
  }

  async updateUser(id: string, updateData: Partial<CreateUserDto>): Promise<UserResponseDto> {
    await this.userRepository.update(id, updateData);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToClass(UserResponseDto, this.sanitizeUser(updatedUser));
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map(user => plainToClass(UserResponseDto, this.sanitizeUser(user)));
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToClass(UserResponseDto, this.sanitizeUser(user));
  }

  private sanitizeUser(user: UserEntity): Partial<UserEntity> {
    // Clone the user entity to avoid modifying the original
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
