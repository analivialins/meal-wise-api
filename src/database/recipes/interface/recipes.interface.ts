class  Ingredients {
    quantity: number;
    unity: number;
    description: string;
}

export class RecipesI {
    name: string;
    totalCalories: number;
    ingredients: Ingredients[];
    prepares: string[];
    cover: number;
}


  