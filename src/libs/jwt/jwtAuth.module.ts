import { Module } from '@nestjs/common'
import { JwtAuthGuard } from './jwtAuth.guard'
import { JwtStrategy } from './jwtAuth.strategy'

@Module({
	providers: [JwtAuthGuard, JwtStrategy],
	exports: [JwtAuthGuard, JwtStrategy]
})
export class JwtAuthModule {}
