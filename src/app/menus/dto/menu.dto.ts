import { IsArray, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RecipeDto } from 'src/app/recipes/dto/recipe.dto';

class MealDto {
  @ApiProperty()
  type: number;

  @ApiProperty()
  recipe: string;
}

export class MenuDto {
  @ApiProperty({ type: [MealDto], required: false })
  @IsOptional()
  @IsArray()
  sunday?: MealDto[];

  @ApiProperty({ type: [MealDto], required: false })
  @IsOptional()
  @IsArray()
  monday?: MealDto[];

  @ApiProperty({ type: [MealDto], required: false })
  @IsOptional()
  @IsArray()
  tuesday?: MealDto[];

  @ApiProperty({ type: [MealDto], required: false })
  @IsOptional()
  @IsArray()
  wednesday?: MealDto[];

  @ApiProperty({ type: [MealDto], required: false })
  @IsOptional()
  @IsArray()
  thursday?: MealDto[];

  @ApiProperty({ type: [MealDto], required: false })
  @IsOptional()
  @IsArray()
  friday?: MealDto[];

  @ApiProperty({ type: [MealDto], required: false })
  @IsOptional()
  @IsArray()
  saturday?: MealDto[];
}
