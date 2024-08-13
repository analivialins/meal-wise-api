import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from '../../database/users/user.entity';
import { UserController } from './user.controller';
import { UsersRepository } from '../../database/users/users.repository';
import { HashModule } from '../../libs/hash/hash.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HashModule],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
