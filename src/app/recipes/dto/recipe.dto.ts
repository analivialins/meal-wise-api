import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class IngredientDto {
    @IsNumber()
    quantity: number;
  
    @IsNumber()
    unity: number;
  
    @IsString()
    description: string;
}

export class RecipeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    cover: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalCalories: number;

    @ApiProperty({ type: [IngredientDto] })
    @ValidateNested({ each: true })
    @Type(() => IngredientDto)
    ingredients: IngredientDto[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    prepares: string[];

}
