import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as argon2 from 'argon2'

@Injectable()
export class HashService {
	async hashPassword(password: string): Promise<string> {
		try {
			const hash = await argon2.hash(password)
			return hash
		} catch (error) {
			throw error || InternalServerErrorException
		}
	}

	async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
		try {
			const isPasswordValid = await argon2.verify(hashedPassword, password)
			return isPasswordValid
		} catch (error) {
			throw error || InternalServerErrorException
		}
	}
}
