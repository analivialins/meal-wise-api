import { Exclude, Expose } from 'class-transformer';
import { InformationsDto } from './informations.dto';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  informations: InformationsDto;

  @Exclude()
  password?: string;
}
