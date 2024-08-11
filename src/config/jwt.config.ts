import { registerAs } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export default registerAs<JwtModuleOptions>('jwt', () => {
	return {
		secret: process.env.JWT_SECRET_KEY,
		signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }
	}
})
