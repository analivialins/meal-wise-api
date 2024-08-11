import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwtAuth.guard';
import { JwtStrategy } from './jwtAuth.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard, JwtStrategy],
})
export class JwtAuthModule {}
