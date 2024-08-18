import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../libs/hash/hash.service';
import { AuthorizationDto } from './dto/authorization.dto';
import { UsersRepository } from '../../database/users/users.repository';
import { UserI } from '../../database/users/interface/user.interface';

@Injectable()
export class AuthorizationService {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authorizationDto: AuthorizationDto): Promise<UserI | null> {
    const userEntity = await this.usersRepository.findByEmail(authorizationDto.email);
    if (!userEntity) {
      return null;
    }

    const isMatch = await this.hashService.verifyPassword(authorizationDto.password, userEntity.password);
    if (isMatch) {
      return await this.usersRepository.getUserById(userEntity.id);
    }
    return null;
  }

  async login(user: UserI): Promise<{ access_token: string; name: string; informations: any }> {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      name: user.name,
      informations: user.informations,
    };
  }

  async authorization(authorizationDto: AuthorizationDto): Promise<{ access_token: string; name: string; informations: any }> {
    const user = await this.validateUser(authorizationDto);
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.login(user);
  }
}
