import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from 'src/libs/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private hashService: HashService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await this.hashService.hashPassword(createUserDto.password);


    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
  async updateUser(id: string, updateData: Partial<CreateUserDto>): Promise<UserEntity> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }
}
