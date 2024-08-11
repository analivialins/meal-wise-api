import { IsBoolean, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthorizationDto {
	@ApiProperty()
	@IsNotEmpty()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	password: string
}
