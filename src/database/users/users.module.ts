import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';
import { HashModule } from '../../libs/hash/hash.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]),HashModule],
	providers: [UsersRepository],
	exports: [UsersRepository]
})

export class UsersDatabaseModule { }