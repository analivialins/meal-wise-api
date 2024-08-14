import { IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RecipeDto } from 'src/app/recipes/dto/recipe.dto';

class MealDto {
  @ApiProperty()
  type: number;

  @ApiProperty()
  recipe: string;
}

export class MenuDto {
  @ApiProperty({ type: MealDto, required: false })
  @IsOptional()
  sunday?: MealDto;

  @ApiProperty({ type: MealDto, required: false })
  @IsOptional()
  monday?: MealDto;

  @ApiProperty({ type: MealDto, required: false })
  @IsOptional()
  tuesday?: MealDto;

  @ApiProperty({ type: MealDto, required: false })
  @IsOptional()
  wednesday?: MealDto;

  @ApiProperty({ type: MealDto, required: false })
  @IsOptional()
  thursday?: MealDto;

  @ApiProperty({ type: MealDto, required: false })
  @IsOptional()
  friday?: MealDto;

  @ApiProperty({ type: MealDto, required: false })
  @IsOptional()
  saturday?: MealDto;
}
