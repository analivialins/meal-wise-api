import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty()
  @IsNumber()
  type: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipe: string;
}
