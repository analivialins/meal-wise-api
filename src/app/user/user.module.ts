import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from '../../database/user/user.entity';
import { UserController } from './user.controller';
import { UsersRepository } from '../../database/user/users.repository';
import { HashModule } from 'src/libs/hash/hash.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HashModule],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
