import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { UserEntity } from '../../database/users/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private authorizationService: AuthorizationService) {
		super()
	}

	async validate(email: string, password: string): Promise<UserEntity> {
		const user = await this.authorizationService.validateUser({ email, password })
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
