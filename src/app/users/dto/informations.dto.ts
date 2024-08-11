import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class InformationsDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    weight: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    height: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    currentWeight: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    goalWeight: string;
}
