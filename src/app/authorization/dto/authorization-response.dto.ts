import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { InformationsDto } from 'src/app/users/dto/informations.dto';

export class AuthorizationResponseDto {
  @IsString()
  access_token: string;

  @IsString()
  name: string;

  @ApiProperty({ type: InformationsDto })
  informations: InformationsDto;
}
