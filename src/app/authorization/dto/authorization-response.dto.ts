import { IsString } from 'class-validator';

export class AuthorizationResponseDto {
  @IsString()
  access_token: string;

  @IsString()
  name: string;
}
