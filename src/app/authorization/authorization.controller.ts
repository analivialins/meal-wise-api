import { Body, Controller, Post } from '@nestjs/common'

import { AuthorizationService } from './authorization.service'

import { Public } from '../../libs/jwt/jwtAuth.guard'
import { AuthorizationDto } from './dto/authorization.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthorizationController {
	constructor(private authorizationService: AuthorizationService) {}
	@Public()
	@Post('login')
	async authorization(@Body() authorizationDto: AuthorizationDto) {
		return this.authorizationService.authorization(authorizationDto)
	}
}
