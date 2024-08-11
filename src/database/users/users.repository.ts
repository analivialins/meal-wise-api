import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const userEntity = this.repository.create(user);
    return this.repository.save(userEntity);
  }

  async updateUserInformations(
    id: string,
    informations: { weight: string; height: string; currentWeight: string; goalWeight: string },
  ): Promise<void> {
    await this.repository.update(id, { informations });
  }

  async updatePassword(password: string, id: string): Promise<void> {
    await this.repository.update(id, { password });
  }

  async getUserById(id: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({
      where: { email: email },
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.repository.find();
  }
}
