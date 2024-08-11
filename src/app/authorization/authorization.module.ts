import { Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { AuthorizationController } from './authorization.controller'

import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { JwtAuthModule } from '../../libs/jwt/jwtAuth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HashModule } from '../../libs/hash/hash.module'
import { UsersDatabaseModule } from '../../database/users/users.module'


@Module({
	imports: [
		UsersDatabaseModule,
		HashModule,
		PassportModule,
		JwtAuthModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const jwtConfig = configService.get<JwtModuleOptions>('jwt')
				return jwtConfig
			}
		})
	],
	providers: [AuthorizationService, LocalStrategy],
	controllers: [AuthorizationController]
})
export class AuthorizationModule {}
