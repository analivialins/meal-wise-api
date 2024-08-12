import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (error) {
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> { 
    try {
      if (!password || !hashedPassword) {
        throw new Error('Password or hashed password is empty');
      }
      return await argon2.verify(hashedPassword, password);
    } catch (error) {
      console.error('Error verifying password:', error.message);
      throw new InternalServerErrorException('Failed to verify password');
    }
  }
  
                      
}