class  Ingredients {
    quantity: number;
    unity: number;
    description: string;
}

export class MenuI {
    type: number; // 0 - brakefast, 1 - lunch, 2 - dinner
    name: string;
    totalCalories: number;
    ingredients: Ingredients[];
    prepares: string[];
}


  